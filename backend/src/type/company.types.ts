export interface CreateCompanyInput {
  name: string;
  userId: string;
}

export interface UpdateCompanyInput {
  name?: string;
  description?: string | null;
  website?: string | null;
  location?: string | null;
  logo?: string | null;
}
