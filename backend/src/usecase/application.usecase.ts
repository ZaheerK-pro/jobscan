import { injectable, inject } from "inversify";
import { TYPES } from "../inversify/types.js";
import { ApplicationRepository } from "../repository/application.repository.js";
import { JobRepository } from "../repository/job.repository.js";
import type { ApplicationStatus } from "../type/application.types.js";
import type { Application } from "../entity/Application.entity.js";
import type { Job } from "../entity/Job.entity.js";

@injectable()
export class ApplicationUseCase {
  constructor(
    @inject(TYPES.ApplicationRepository) private applicationRepository: ApplicationRepository,
    @inject(TYPES.JobRepository) private jobRepository: JobRepository
  ) {}

  async apply(
    jobId: string,
    applicantId: string
  ): Promise<{ message: string; success: boolean } | { message: string; success: false }> {
    const existing = await this.applicationRepository.findByJobAndApplicant(jobId, applicantId);
    if (existing) {
      return { message: "You have already applied for this job", success: false };
    }
    const job = await this.jobRepository.findById(jobId);
    if (!job) {
      return { message: "Job not found", success: false };
    }
    await this.applicationRepository.save({ jobId, applicantId });
    return { message: "Job applied successfully.", success: true };
  }

  async getByApplicant(applicantId: string): Promise<{ application: Application[]; success: boolean }> {
    const applications = await this.applicationRepository.findByApplicantId(applicantId);
    return { application: applications, success: true };
  }

  async getApplicantsForJob(
    jobId: string
  ): Promise<{ job: Job | null; success: boolean } | { message: string; success: false }> {
    const job = await this.jobRepository.findByIdWithApplications(jobId);
    if (!job) {
      return { message: "Job not found.", success: false };
    }
    return { job, success: true };
  }

  async updateStatus(
    applicationId: string,
    status: ApplicationStatus
  ): Promise<{ message: string; success: boolean } | { message: string; success: false }> {
    const application = await this.applicationRepository.findById(applicationId);
    if (!application) {
      return { message: "Application not found.", success: false };
    }
    const allowed: ApplicationStatus[] = ["pending", "viewed"];
    if (!allowed.includes(status)) {
      return { message: "Invalid status", success: false };
    }
    application.status = status;
    await this.applicationRepository.save(application);
    return { message: "Status updated successfully.", success: true };
  }

  /** Mark application as viewed when recruiter opens the resume. */
  async markAsViewed(applicationId: string): Promise<{ message: string; success: boolean } | { message: string; success: false }> {
    const application = await this.applicationRepository.findById(applicationId);
    if (!application) {
      return { message: "Application not found.", success: false };
    }
    application.status = "viewed";
    await this.applicationRepository.save(application);
    return { message: "Marked as viewed.", success: true };
  }
}
