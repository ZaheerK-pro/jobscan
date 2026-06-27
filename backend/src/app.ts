import "reflect-metadata";
import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { Container } from "inversify";
import { userRoutes } from "./routes/user.routes.js";
import { companyRoutes } from "./routes/company.routes.js";
import { jobRoutes } from "./routes/job.routes.js";
import { applicationRoutes } from "./routes/application.routes.js";

export async function buildApp(container: Container) {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  });

  await app.register(cookie, {
    secret: process.env.COOKIE_SECRET ?? "jobscan-cookie-secret",
  });

  await app.register(multipart, {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  });

  const port = process.env.PORT ?? 3000;
  const baseUrl = `http://localhost:${port}`;

  await app.register(swagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "JobScan API",
        description: "API for JobScan - Job listing and application platform. Use **POST /api/v1/user/login** to get a session cookie, then call protected routes (cookie is sent automatically in same-origin requests).",
        version: "1.0.0",
      },
      servers: [
        { url: baseUrl, description: "Development" },
      ],
      tags: [
        { name: "user", description: "User auth and profile" },
        { name: "company", description: "Company management" },
        { name: "job", description: "Job listing" },
        { name: "application", description: "Job applications" },
      ],
      components: {
        securitySchemes: {
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "token",
            description: "Session cookie set by POST /api/v1/user/login. Use 'Try it out' in browser so cookies are sent.",
          },
        },
      },
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
      tryItOutEnabled: true,
    },
    staticCSP: true,
  });

  await app.register(async (instance) => {
    await userRoutes(instance, container);
  }, { prefix: "/api/v1/user" });

  await app.register(async (instance) => {
    await companyRoutes(instance, container);
  }, { prefix: "/api/v1/company" });

  await app.register(async (instance) => {
    await jobRoutes(instance, container);
  }, { prefix: "/api/v1/job" });

  await app.register(async (instance) => {
    await applicationRoutes(instance, container);
  }, { prefix: "/api/v1/application" });

  return app;
}
