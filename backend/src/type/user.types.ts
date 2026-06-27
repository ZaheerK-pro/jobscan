export type UserRole = "student" | "recruiter";

export interface RegisterUserInput {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: UserRole;
  profilePhotoUrl: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
  role: string;
}

export interface UpdateProfileInput {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string | null;
  skills?: string[];
  resume?: string | null;
  resumeOriginalName?: string | null;
}

export interface SanitizedUser {
  id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  profile: {
    bio: string | null;
    skills: string[] | null;
    resume: string | null;
    resumeOriginalName: string | null;
    companyId: string | null;
    profilePhoto: string;
  };
}
