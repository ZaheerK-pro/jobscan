export const registerCompanySchema = {
  tags: ["company"],
  summary: "Register a company",
  body: {
    type: "object",
    properties: { companyName: { type: "string" } },
    required: ["companyName"],
  },
  response: { 201: { type: "object" } },
};

export const getCompaniesSchema = {
  tags: ["company"],
  summary: "Get companies for current user",
};

export const getCompanyByIdSchema = {
  tags: ["company"],
  summary: "Get company by ID",
  params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
};

export const updateCompanySchema = {
  tags: ["company"],
  summary: "Update company",
  params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
};
