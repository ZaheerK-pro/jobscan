import { injectable, inject } from "inversify";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TYPES } from "../inversify/types.js";
import { UserRepository } from "../repository/user.repository.js";
import { User } from "../entity/User.entity.js";
import type {
  RegisterUserInput,
  LoginUserInput,
  UpdateProfileInput,
  SanitizedUser,
  UserRole,
} from "../type/user.types.js";

function sanitizeUser(user: User): SanitizedUser {
  return {
    id: user.id,
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    profile: {
      bio: user.bio,
      skills: user.skills,
      resume: user.resume,
      resumeOriginalName: user.resumeOriginalName,
      companyId: user.companyId,
      profilePhoto: user.profilePhoto,
    },
  };
}

@injectable()
export class UserUseCase {
  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  async register(input: RegisterUserInput): Promise<{ message: string; success: boolean }> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      return { message: "User already exist with this email.", success: false };
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    await this.userRepository.save({
      fullname: input.fullname,
      email: input.email,
      phoneNumber: input.phoneNumber,
      password: hashedPassword,
      role: input.role as UserRole,
      profilePhoto: input.profilePhotoUrl,
    });
    return { message: "Account created successfully.", success: true };
  }

  async login(
    input: LoginUserInput
  ): Promise<
    | { message: string; user: SanitizedUser; success: true; token: string }
    | { message: string; success: false }
  > {
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      return { message: "Incorrect email or password.", success: false };
    }
    const isPasswordMatch = await bcrypt.compare(input.password, user.password);
    if (!isPasswordMatch) {
      return { message: "Incorrect email or password.", success: false };
    }
    if (input.role !== user.role) {
      return { message: "Account doesn't exist with current role.", success: false };
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY!, { expiresIn: "1d" });
    return {
      message: `Welcome back ${user.fullname}`,
      user: sanitizeUser(user),
      success: true,
      token,
    };
  }

  async updateProfile(
    userId: string,
    input: UpdateProfileInput
  ): Promise<{ message: string; user: SanitizedUser; success: boolean } | { message: string; success: false }> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return { message: "User not found.", success: false };
    }
    if (input.fullname) user.fullname = input.fullname;
    if (input.email) user.email = input.email;
    if (input.phoneNumber) user.phoneNumber = input.phoneNumber;
    if (input.bio !== undefined) user.bio = input.bio;
    if (input.skills) user.skills = input.skills;
    if (input.resume !== undefined) user.resume = input.resume;
    if (input.resumeOriginalName !== undefined) user.resumeOriginalName = input.resumeOriginalName;
    const saved = await this.userRepository.save(user);
    return {
      message: "Profile updated successfully.",
      user: sanitizeUser(saved),
      success: true,
    };
  }

  sanitizeUser(user: User): SanitizedUser {
    return sanitizeUser(user);
  }
}
