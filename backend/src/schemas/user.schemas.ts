// No body schema: register accepts multipart/form-data (file + fields), validated in controller
export const registerUserSchema = {
  tags: ["user"],
  summary: "Register a new user",
  response: { 201: { type: "object", properties: { message: { type: "string" }, success: { type: "boolean" } } } },
};

export const loginUserSchema = {
  tags: ["user"],
  summary: "Login",
  description: "Returns user object and sets HTTP-only cookie `token`. Use this cookie for protected routes.",
  body: {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
      role: { type: "string", enum: ["student", "recruiter"] },
    },
    required: ["email", "password", "role"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        user: {
          type: "object",
          properties: {
            id: { type: "string" },
            fullname: { type: "string" },
            email: { type: "string" },
            role: { type: "string" },
            profile: { type: "object" },
          },
        },
      },
    },
  },
};

export const logoutSchema = {
  tags: ["user"],
  summary: "Logout",
};

export const updateProfileSchema = {
  tags: ["user"],
  summary: "Update profile",
  response: { 200: { type: "object" } },
};

export const importResumeSchema = {
  tags: ["user"],
  summary: "Import resume (PDF): upload, parse, and update profile",
  response: {
    200: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
        user: { type: "object" },
      },
    },
  },
};
