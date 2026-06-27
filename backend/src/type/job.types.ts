export interface CreateJobInput {
  title: string;
  description: string;
  requirements: string[];
  salary: number;
  location: string;
  jobType: string;
  experienceLevel: number;
  position: number;
  companyId: string;
  createdById: string;
}

export interface JobListQuery {
  keyword?: string;
}
