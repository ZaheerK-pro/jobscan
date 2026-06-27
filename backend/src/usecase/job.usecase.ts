import { injectable, inject } from "inversify";
import { TYPES } from "../inversify/types.js";
import { JobRepository } from "../repository/job.repository.js";
import type { CreateJobInput, JobListQuery } from "../type/job.types.js";
import type { Job } from "../entity/Job.entity.js";

@injectable()
export class JobUseCase {
  constructor(@inject(TYPES.JobRepository) private jobRepository: JobRepository) {}

  async create(userId: string, input: CreateJobInput): Promise<{ job: Job; success: boolean }> {
    const job = await this.jobRepository.save({
      ...input,
      createdById: userId,
    });
    return { job, success: true };
  }

  async list(query: JobListQuery): Promise<{ jobs: Job[]; success: boolean }> {
    const jobs = await this.jobRepository.findAllWithCompany(query.keyword);
    return { jobs, success: true };
  }

  async getById(
    id: string
  ): Promise<{ job: Job; success: boolean } | { message: string; success: false }> {
    const job = await this.jobRepository.findById(id, ["applications", "company"]);
    if (!job) {
      return { message: "Job not found.", success: false };
    }
    return { job, success: true };
  }

  async getByCreatedBy(userId: string): Promise<{ jobs: Job[]; success: boolean }> {
    const jobs = await this.jobRepository.findByCreatedById(userId);
    return { jobs, success: true };
  }
}
