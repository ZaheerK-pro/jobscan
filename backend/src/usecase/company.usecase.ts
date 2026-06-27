import { injectable, inject } from "inversify";
import { TYPES } from "../inversify/types.js";
import { UserRepository } from "../repository/user.repository.js";
import { CompanyRepository } from "../repository/company.repository.js";
import type { CreateCompanyInput, UpdateCompanyInput } from "../type/company.types.js";
import type { Company } from "../entity/Company.entity.js";

@injectable()
export class CompanyUseCase {
  constructor(
    @inject(TYPES.CompanyRepository) private companyRepository: CompanyRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}

  async register(
    userId: string,
    companyName: string
  ): Promise<{ message: string; company: Company; success: boolean } | { message: string; success: false }> {
    const existing = await this.companyRepository.findByName(companyName);
    if (existing) {
      return { message: "You can't register same company.", success: false };
    }
    const company = await this.companyRepository.save({ name: companyName, userId });
    return { message: "Company registered successfully.", company, success: true };
  }

  async getByUserId(userId: string): Promise<{ companies: Company[]; success: boolean }> {
    const companies = await this.companyRepository.findByUserId(userId);
    return { companies, success: true };
  }

  async getById(
    id: string
  ): Promise<{ company: Company; success: boolean } | { message: string; success: false }> {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      return { message: "Company not found.", success: false };
    }
    return { company, success: true };
  }

  async update(
    id: string,
    input: UpdateCompanyInput,
    logoUrl?: string
  ): Promise<{ message: string; success: boolean } | { message: string; success: false }> {
    const company = await this.companyRepository.findById(id);
    if (!company) {
      return { message: "Company not found.", success: false };
    }
    if (input.name) company.name = input.name;
    if (input.description !== undefined) company.description = input.description;
    if (input.website !== undefined) company.website = input.website;
    if (input.location !== undefined) company.location = input.location;
    if (logoUrl) company.logo = logoUrl;
    await this.companyRepository.save(company);
    return { message: "Company information updated.", success: true };
  }
}
