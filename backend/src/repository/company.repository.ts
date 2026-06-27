import { Repository } from "typeorm";
import { injectable, inject } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "../inversify/types.js";
import { Company } from "../entity/Company.entity.js";

@injectable()
export class CompanyRepository {
  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {}

  getRepo(): Repository<Company> {
    return this.dataSource.getRepository(Company);
  }

  async findById(id: string): Promise<Company | null> {
    return this.getRepo().findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Company | null> {
    return this.getRepo().findOne({ where: { name } });
  }

  async findByUserId(userId: string): Promise<Company[]> {
    return this.getRepo().find({ where: { userId }, order: { createdAt: "DESC" } });
  }

  async save(entity: Partial<Company>): Promise<Company> {
    return this.getRepo().save(entity as Company);
  }
}
