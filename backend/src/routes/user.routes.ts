import type { FastifyInstance } from "fastify";
import { TYPES } from "../inversify/types.js";
import type { Container } from "inversify";
import { UserController } from "../controller/user.controller.js";
import { registerUserSchema, loginUserSchema, logoutSchema, updateProfileSchema, importResumeSchema } from "../schemas/user.schemas.js";
import { isAuthenticated } from "../middlewares/auth.js";

export async function userRoutes(app: FastifyInstance, container: Container): Promise<void> {
  const controller = container.get<UserController>(TYPES.UserController);

  app.post("/register", { schema: registerUserSchema }, (req, reply) => controller.register(req, reply));
  app.post("/login", { schema: loginUserSchema }, (req, reply) => controller.login(req, reply));
  app.get("/logout", { schema: logoutSchema }, (req, reply) => controller.logout(req, reply));
  app.post("/profile/update", {
    preHandler: [isAuthenticated],
    schema: updateProfileSchema,
  }, (req, reply) => controller.updateProfile(req, reply));
  app.post("/profile/import-resume", {
    preHandler: [isAuthenticated],
    schema: importResumeSchema,
  }, (req, reply) => controller.importResume(req, reply));
}
