import type { FastifyRequest, FastifyReply } from "fastify";
import { injectable, inject } from "inversify";
import { TYPES } from "../inversify/types.js";
import { UserUseCase } from "../usecase/user.usecase.js";
import type { UserRole } from "../type/user.types.js";
import cloudinary from "../utils/cloudinary.js";
import { parseResumeFromPdf } from "../utils/parseResume.js";

@injectable()
export class UserController {
  constructor(@inject(TYPES.UserUseCase) private userUseCase: UserUseCase) {}

  async register(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const fields: Record<string, string> = {};
    let fileBuffer: Buffer | null = null;
    let fileMimetype = "";

    try {
      for await (const part of request.parts()) {
        if (part.type === "field") {
          fields[(part as { fieldname: string; value: string }).fieldname] = (
            part as { fieldname: string; value: string }
          ).value;
        } else {
          const f = part as { toBuffer: () => Promise<Buffer>; mimetype: string };
          fileBuffer = await f.toBuffer();
          fileMimetype = f.mimetype ?? "";
        }
      }
    } catch {
      // no multipart
    }

    const { fullname, email, phoneNumber, password, role } = fields;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      await reply.status(400).send({ message: "Something is missing", success: false });
      return;
    }
    if (!fileBuffer || fileBuffer.length === 0) {
      await reply.status(400).send({ message: "Profile photo (file) is required", success: false });
      return;
    }

    const parser = (await import("datauri/parser.js")).default;
    const ext = fileMimetype === "image/png" ? ".png" : fileMimetype === "image/jpeg" ? ".jpg" : ".png";
    const uri = new parser().format(ext, fileBuffer);
    const cloudResponse = await cloudinary.uploader.upload(uri.content!);

    const result = await this.userUseCase.register({
      fullname,
      email,
      phoneNumber,
      password,
      role: role as UserRole,
      profilePhotoUrl: cloudResponse.secure_url,
    });

    if (!result.success) {
      await reply.status(400).send(result);
      return;
    }
    await reply.status(201).send(result);
  }

  async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const body = request.body as { email: string; password: string; role: string };
    const { email, password, role } = body;
    if (!email || !password || !role) {
      await reply.status(400).send({ message: "Something is missing", success: false });
      return;
    }

    const result = await this.userUseCase.login({ email, password, role });
    if (!result.success) {
      await reply.status(400).send(result);
      return;
    }

    await reply
      .setCookie("token", result.token, {
        maxAge: 24 * 60 * 60,
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      })
      .status(200)
      .send({
        message: result.message,
        user: result.user,
        success: true,
      });
  }

  async logout(_request: FastifyRequest, reply: FastifyReply): Promise<void> {
    await reply
      .setCookie("token", "", { maxAge: 0, path: "/" })
      .status(200)
      .send({ message: "Logged out successfully.", success: true });
  }

  async updateProfile(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = request.userId!;
    const fields: Record<string, string> = {};
    let fileBuffer: Buffer | null = null;
    let fileExt = ".pdf";
    let uploadedFileName = "resume.pdf";

    try {
      for await (const part of request.parts()) {
        if (part.type === "field") {
          fields[(part as { fieldname: string; value: string }).fieldname] = (
            part as { fieldname: string; value: string }
          ).value;
        } else {
          const f = part as { toBuffer: () => Promise<Buffer>; filename: string };
          fileBuffer = await f.toBuffer();
          uploadedFileName = f.filename ?? "resume.pdf";
          fileExt = f.filename ? `.${f.filename.split(".").pop() ?? "bin"}` : ".pdf";
        }
      }
    } catch {
      // No multipart
    }

    let fullname = fields.fullname?.trim();
    let email = fields.email?.trim();
    let phoneNumber = fields.phoneNumber?.trim();
    let bio = fields.bio?.trim();
    const skillsStr = fields.skills?.trim();

    let resumeUrl: string | undefined;
    let resumeOriginalName: string | undefined;
    let parsed: Awaited<ReturnType<typeof parseResumeFromPdf>> = {};

    if (fileBuffer && fileBuffer.length > 0) {
      const parser = (await import("datauri/parser.js")).default;
      const uri = new parser().format(fileExt, fileBuffer);
      const cloudResponse = await cloudinary.uploader.upload(uri.content!);
      resumeUrl = cloudResponse.secure_url;
      resumeOriginalName = uploadedFileName;
      try {
        parsed = await parseResumeFromPdf(fileBuffer);
      } catch {
        // ignore parse errors; form data still used
      }
      // Auto-fill empty form fields from parsed resume
      if (!fullname && parsed.fullname) fullname = parsed.fullname;
      if (!email && parsed.email) email = parsed.email;
      if (!phoneNumber && parsed.phoneNumber) phoneNumber = parsed.phoneNumber;
      if (!bio && parsed.bio) bio = parsed.bio;
    }

    const skills = skillsStr
      ? skillsStr.split(",").map((s) => s.trim()).filter(Boolean)
      : parsed.skills;

    const result = await this.userUseCase.updateProfile(userId, {
      fullname: fullname ?? undefined,
      email: email ?? undefined,
      phoneNumber: phoneNumber ?? undefined,
      bio: bio ?? undefined,
      skills: skills?.length ? skills : undefined,
      resume: resumeUrl,
      resumeOriginalName: resumeOriginalName,
    });

    if (!result.success) {
      await reply.status(400).send(result);
      return;
    }
    await reply.status(200).send(result);
  }

  /** Import resume: upload PDF, parse it, and update profile with extracted data + resume URL. */
  async importResume(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const userId = request.userId!;
    let fileBuffer: Buffer | null = null;
    let uploadedFileName = "resume.pdf";
    let fileExt = ".pdf";

    try {
      for await (const part of request.parts()) {
        if (part.type !== "field") {
          const f = part as { toBuffer: () => Promise<Buffer>; filename: string };
          fileBuffer = await f.toBuffer();
          uploadedFileName = f.filename ?? "resume.pdf";
          fileExt = f.filename ? `.${f.filename.split(".").pop() ?? "bin"}` : ".pdf";
          break;
        }
      }
    } catch {
      // no multipart
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      await reply.status(400).send({ message: "Resume file (PDF) is required.", success: false });
      return;
    }

    const parser = (await import("datauri/parser.js")).default;
    const uri = new parser().format(fileExt, fileBuffer);
    const cloudResponse = await cloudinary.uploader.upload(uri.content!);
    const resumeUrl = cloudResponse.secure_url;

    let parsed: Awaited<ReturnType<typeof parseResumeFromPdf>> = {};
    try {
      parsed = await parseResumeFromPdf(fileBuffer);
    } catch {
      // continue with just resume URL
    }

    const result = await this.userUseCase.updateProfile(userId, {
      fullname: parsed.fullname,
      email: parsed.email,
      phoneNumber: parsed.phoneNumber,
      bio: parsed.bio,
      skills: parsed.skills,
      resume: resumeUrl,
      resumeOriginalName: uploadedFileName,
    });

    if (!result.success) {
      await reply.status(400).send(result);
      return;
    }
    await reply.status(200).send({
      message: "Resume imported and profile updated.",
      user: result.user,
      success: true,
    });
  }
}
