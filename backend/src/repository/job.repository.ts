import { Repository } from "typeorm";
import { injectable, inject } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "../inversify/types.js";
import { Job } from "../entity/Job.entity.js";

@injectable()
export class JobRepository {
  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {}

  getRepo(): Repository<Job> {
    return this.dataSource.getRepository(Job);
  }

  async findById(id: string, relations?: string[]): Promise<Job | null> {
    return this.getRepo().findOne({ where: { id }, relations: relations ?? [] });
  }

  async findByIdWithApplications(id: string): Promise<Job | null> {
    return this.getRepo().findOne({
      where: { id },
      relations: ["applications", "applications.applicant"],
      order: { createdAt: "DESC" },
    });
  }

  async findByCreatedById(createdById: string): Promise<Job[]> {
    return this.getRepo().find({
      where: { createdById },
      relations: ["company"],
      order: { createdAt: "DESC" },
    });
  }

  async findAllWithCompany(keyword?: string): Promise<Job[]> {
    const qb = this.getRepo()
      .createQueryBuilder("job")
      .leftJoinAndSelect("job.company", "company")
      .orderBy("job.createdAt", "DESC");
    if (keyword) {
      qb.andWhere("(job.title ILIKE :keyword OR job.description ILIKE :keyword)", {
        keyword: `%${keyword}%`,
      });
    }
    return qb.getMany();
  }

  async save(entity: Partial<Job>): Promise<Job> {
    return this.getRepo().save(entity as Job);
  }
}
