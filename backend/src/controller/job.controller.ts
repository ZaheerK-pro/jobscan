import type { FastifyRequest, FastifyReply } from "fastify";
import { injectable, inject } from "inversify";
import { TYPES } from "../inversify/types.js";
import { JobUseCase } from "../usecase/job.usecase.js";

@injectable()
export class JobController {
  constructor(@inject(TYPES.JobUseCase) private jobUseCase: JobUseCase) {}

  async post(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const body = request.body as {
      title: string;
      description: string;
      requirements: string;
      salary: number;
      location: string;
      jobType: string;
      experience: number;
      position: number;
      companyId: string;
    };
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = body;

    if (!title || !description || !requirements || salary == null || !location || !jobType || experience == null || position == null || !companyId) {
      await reply.status(400).send({ message: "Something is missing.", success: false });
      return;
    }

    const result = await this.jobUseCase.create(request.userId!, {
      title,
      description,
      requirements: requirements.split(",").map((s) => s.trim()),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position: Number(position),
      companyId,
      createdById: request.userId!,
    });

    await reply.status(201).send({
      message: "New job created successfully.",
      job: result.job,
      success: true,
    });
  }

  async get(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const keyword = (request.query as { keyword?: string }).keyword;
    const result = await this.jobUseCase.list({ keyword });
    await reply.status(200).send(result);
  }

  async getById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const id = (request.params as { id: string }).id;
    const result = await this.jobUseCase.getById(id);
    if (!result.success) {
      await reply.status(404).send(result);
      return;
    }
    await reply.status(200).send(result);
  }

  async getAdminJobs(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.jobUseCase.getByCreatedBy(request.userId!);
    await reply.status(200).send(result);
  }
}
