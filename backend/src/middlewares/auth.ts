import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export async function isAuthenticated(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const token = request.cookies.token;
    if (!token) {
      await reply.status(401).send({
        message: "User not authenticated",
        success: false,
      });
      return;
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY!) as {
      userId: string;
    };
    if (!decode) {
      await reply.status(401).send({
        message: "Invalid token",
        success: false,
      });
      return;
    }
    request.userId = decode.userId;
  } catch {
    await reply.status(401).send({
      message: "Invalid or expired token",
      success: false,
    });
  }
}
