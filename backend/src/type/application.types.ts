export type ApplicationStatus = "pending" | "viewed";

export interface ApplyJobInput {
  jobId: string;
  applicantId: string;
}

export interface UpdateApplicationStatusInput {
  status: ApplicationStatus;
}
