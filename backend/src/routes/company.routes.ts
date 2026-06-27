import type { FastifyInstance } from "fastify";
import { TYPES } from "../inversify/types.js";
import type { Container } from "inversify";
import { CompanyController } from "../controller/company.controller.js";
import {
  registerCompanySchema,
  getCompaniesSchema,
  getCompanyByIdSchema,
  updateCompanySchema,
} from "../schemas/company.schemas.js";
import { isAuthenticated } from "../middlewares/auth.js";

export async function companyRoutes(app: FastifyInstance, container: Container): Promise<void> {
  const controller = container.get<CompanyController>(TYPES.CompanyController);

  app.post("/register", {
    preHandler: [isAuthenticated],
    schema: registerCompanySchema,
  }, (req, reply) => controller.register(req, reply));
  app.get("/get", {
    preHandler: [isAuthenticated],
    schema: getCompaniesSchema,
  }, (req, reply) => controller.getByUserId(req, reply));
  app.get("/get/:id", {
    preHandler: [isAuthenticated],
    schema: getCompanyByIdSchema,
  }, (req, reply) => controller.getById(req, reply));
  app.put("/update/:id", {
    preHandler: [isAuthenticated],
    schema: updateCompanySchema,
  }, (req, reply) => controller.update(req, reply));
}
