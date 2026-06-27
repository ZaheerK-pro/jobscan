export const applyJobSchema = {
  tags: ["application"],
  summary: "Apply for a job",
  params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
};

export const getApplicationsSchema = {
  tags: ["application"],
  summary: "Get applied jobs for current user",
};

export const getApplicantsSchema = {
  tags: ["application"],
  summary: "Get applicants for a job",
  params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
};

export const updateApplicationStatusSchema = {
  tags: ["application"],
  summary: "Update application status",
  params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  body: {
    type: "object",
    properties: { status: { type: "string", enum: ["pending", "viewed"] } },
    required: ["status"],
  },
};

export const viewResumeSchema = {
  tags: ["application"],
  summary: "Mark application as viewed (recruiter viewed resume)",
  params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
  response: { 200: { type: "object", properties: { success: { type: "boolean" }, message: { type: "string" } } } },
};
