import type { FastifyInstance } from "fastify";
import { TYPES } from "../inversify/types.js";
import type { Container } from "inversify";
import { JobController } from "../controller/job.controller.js";
import {
  postJobSchema,
  getJobsSchema,
  getJobByIdSchema,
  getAdminJobsSchema,
} from "../schemas/job.schemas.js";
import { isAuthenticated } from "../middlewares/auth.js";

export async function jobRoutes(app: FastifyInstance, container: Container): Promise<void> {
  const controller = container.get<JobController>(TYPES.JobController);

  app.post("/post", {
    preHandler: [isAuthenticated],
    schema: postJobSchema,
  }, (req, reply) => controller.post(req, reply));
  /* List jobs and get job by id are public (no auth) so guests can browse from Careers */
  app.get("/get", { schema: getJobsSchema }, (req, reply) => controller.get(req, reply));
  app.get("/get/:id", { schema: getJobByIdSchema }, (req, reply) => controller.getById(req, reply));
  app.get("/getadminjobs", {
    preHandler: [isAuthenticated],
    schema: getAdminJobsSchema,
  }, (req, reply) => controller.getAdminJobs(req, reply));
}
