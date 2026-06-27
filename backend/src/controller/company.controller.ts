import type { FastifyRequest, FastifyReply } from "fastify";
import { injectable, inject } from "inversify";
import { TYPES } from "../inversify/types.js";
import { CompanyUseCase } from "../usecase/company.usecase.js";
import cloudinary from "../utils/cloudinary.js";

@injectable()
export class CompanyController {
  constructor(@inject(TYPES.CompanyUseCase) private companyUseCase: CompanyUseCase) {}

  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const body = request.body as { companyName: string };
    const { companyName } = body;
    if (!companyName) {
      await reply.status(400).send({ message: "Company name is required.", success: false });
      return;
    }

    const result = await this.companyUseCase.register(request.userId!, companyName);
    if (!result.success) {
      await reply.status(400).send(result);
      return;
    }
    await reply.status(201).send(result);
  }

  async getByUserId(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.companyUseCase.getByUserId(request.userId!);
    await reply.status(200).send(result);
  }

  async getById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const id = (request.params as { id: string }).id;
    const result = await this.companyUseCase.getById(id);
    if (!result.success) {
      await reply.status(404).send(result);
      return;
    }
    await reply.status(200).send(result);
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const paramId = (request.params as { id: string }).id;
    const fields: Record<string, string> = {};
    let fileBuffer: Buffer | null = null;
    let fileExt = ".png";

    try {
      for await (const part of request.parts()) {
        if (part.type === "field") {
          fields[(part as { fieldname: string; value: string }).fieldname] = (
            part as { fieldname: string; value: string }
          ).value;
        } else {
          const f = part as { toBuffer: () => Promise<Buffer>; filename: string };
          fileBuffer = await f.toBuffer();
          fileExt = f.filename ? `.${f.filename.split(".").pop() ?? "png"}` : ".png";
        }
      }
    } catch {
      // No multipart
    }

    const name = fields.name;
    const description = fields.description;
    const website = fields.website;
    const location = fields.location;

    let logoUrl: string | undefined;
    if (fileBuffer && fileBuffer.length > 0) {
      const parser = (await import("datauri/parser.js")).default;
      const uri = new parser().format(fileExt, fileBuffer);
      const cloudResponse = await cloudinary.uploader.upload(uri.content!);
      logoUrl = cloudResponse.secure_url;
    }

    const result = await this.companyUseCase.update(paramId, {
      name,
      description: description ?? undefined,
      website: website ?? undefined,
      location: location ?? undefined,
    }, logoUrl);

    if (!result.success) {
      await reply.status(404).send(result);
      return;
    }
    await reply.status(200).send(result);
  }
}
