export const postJobSchema = {
  tags: ["job"],
  summary: "Post a new job",
  body: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      requirements: { type: "string" },
      salary: { type: "number" },
      location: { type: "string" },
      jobType: { type: "string" },
      experience: { type: "number" },
      position: { type: "number" },
      companyId: { type: "string" },
    },
    required: ["title", "description", "requirements", "salary", "location", "jobType", "experience", "position", "companyId"],
  },
  response: { 201: { type: "object" } },
};

export const getJobsSchema = {
  tags: ["job"],
  summary: "Get all jobs (with optional keyword search)",
  querystring: { type: "object", properties: { keyword: { type: "string" } } },
};

export const getJobByIdSchema = {
  tags: ["job"],
  summary: "Get job by ID",
  params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
};

export const getAdminJobsSchema = {
  tags: ["job"],
  summary: "Get jobs created by current admin",
};
