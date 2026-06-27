import type { FastifyRequest, FastifyReply } from "fastify";
import { injectable, inject } from "inversify";
import { TYPES } from "../inversify/types.js";
import { ApplicationUseCase } from "../usecase/application.usecase.js";
import type { ApplicationStatus } from "../type/application.types.js";

@injectable()
export class ApplicationController {
  constructor(@inject(TYPES.ApplicationUseCase) private applicationUseCase: ApplicationUseCase) {}

  async apply(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const jobId = (request.params as { id: string }).id;
    if (!jobId) {
      await reply.status(400).send({ message: "Job id is required.", success: false });
      return;
    }

    const result = await this.applicationUseCase.apply(jobId, request.userId!);
    if (!result.success) {
      await reply.status(result.message.includes("already applied") ? 400 : 404).send(result);
      return;
    }
    await reply.status(201).send(result);
  }

  async get(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.applicationUseCase.getByApplicant(request.userId!);
    await reply.status(200).send(result);
  }

  async getApplicants(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const id = (request.params as { id: string }).id;
    const result = await this.applicationUseCase.getApplicantsForJob(id);
    if (!result.success) {
      await reply.status(404).send(result);
      return;
    }
    await reply.status(200).send({ job: result.job, success: true });
  }

  async updateStatus(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const applicationId = (request.params as { id: string }).id;
    const { status } = request.body as { status: string };

    if (!status) {
      await reply.status(400).send({ message: "Status is required", success: false });
      return;
    }

    const newStatus = status.toLowerCase() as ApplicationStatus;
    const result = await this.applicationUseCase.updateStatus(applicationId, newStatus);

    if (!result.success) {
      await reply.status(result.message === "Invalid status" ? 400 : 404).send(result);
      return;
    }
    await reply.status(200).send(result);
  }

  /** Recruiter viewed applicant's resume – marks application so student sees "Recruiter viewed your resume". */
  async viewResume(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const applicationId = (request.params as { id: string }).id;
    const result = await this.applicationUseCase.markAsViewed(applicationId);
    if (!result.success) {
      await reply.status(404).send(result);
      return;
    }
    await reply.status(200).send(result);
  }
}
