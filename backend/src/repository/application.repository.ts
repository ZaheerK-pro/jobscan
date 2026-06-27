import { Repository } from "typeorm";
import { injectable, inject } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "../inversify/types.js";
import { Application } from "../entity/Application.entity.js";

@injectable()
export class ApplicationRepository {
  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {}

  getRepo(): Repository<Application> {
    return this.dataSource.getRepository(Application);
  }

  async findById(id: string): Promise<Application | null> {
    return this.getRepo().findOne({ where: { id } });
  }

  async findByJobAndApplicant(jobId: string, applicantId: string): Promise<Application | null> {
    return this.getRepo().findOne({ where: { jobId, applicantId } });
  }

  async findByApplicantId(applicantId: string): Promise<Application[]> {
    return this.getRepo().find({
      where: { applicantId },
      relations: ["job", "job.company"],
      order: { createdAt: "DESC" },
    });
  }

  async save(entity: Partial<Application>): Promise<Application> {
    return this.getRepo().save(entity as Application);
  }
}
