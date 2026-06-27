import { Repository } from "typeorm";
import { injectable, inject } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "../inversify/types.js";
import { User } from "../entity/User.entity.js";

@injectable()
export class UserRepository {
  constructor(@inject(TYPES.DataSource) private dataSource: DataSource) {}

  getRepo(): Repository<User> {
    return this.dataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    return this.getRepo().findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.getRepo().findOne({ where: { email } });
  }

  async save(entity: Partial<User>): Promise<User> {
    return this.getRepo().save(entity as User);
  }
}
