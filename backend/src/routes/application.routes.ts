import type { FastifyInstance } from "fastify";
import { TYPES } from "../inversify/types.js";
import type { Container } from "inversify";
import { ApplicationController } from "../controller/application.controller.js";
import {
  applyJobSchema,
  getApplicationsSchema,
  getApplicantsSchema,
  updateApplicationStatusSchema,
  viewResumeSchema,
} from "../schemas/application.schemas.js";
import { isAuthenticated } from "../middlewares/auth.js";

export async function applicationRoutes(app: FastifyInstance, container: Container): Promise<void> {
  const controller = container.get<ApplicationController>(TYPES.ApplicationController);

  app.get("/apply/:id", {
    preHandler: [isAuthenticated],
    schema: applyJobSchema,
  }, (req, reply) => controller.apply(req, reply));
  app.get("/get", {
    preHandler: [isAuthenticated],
    schema: getApplicationsSchema,
  }, (req, reply) => controller.get(req, reply));
  app.get("/:id/applicants", {
    preHandler: [isAuthenticated],
    schema: getApplicantsSchema,
  }, (req, reply) => controller.getApplicants(req, reply));
  app.post("/status/:id/update", {
    preHandler: [isAuthenticated],
    schema: updateApplicationStatusSchema,
  }, (req, reply) => controller.updateStatus(req, reply));
  app.post("/:id/view", {
    preHandler: [isAuthenticated],
    schema: viewResumeSchema,
  }, (req, reply) => controller.viewResume(req, reply));
}
