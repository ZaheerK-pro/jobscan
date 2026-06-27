import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User.entity.js";
import { Company } from "../entity/Company.entity.js";
import { Job } from "../entity/Job.entity.js";
import { Application } from "../entity/Application.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PG_HOST ?? "localhost",
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USER ?? "postgres",
  password: process.env.PG_PASSWORD ?? "postgres",
  database: process.env.PG_DATABASE ?? "jobscan",
  synchronize: process.env.NODE_ENV !== "production",
  logging: process.env.NODE_ENV === "development",
  entities: [User, Company, Job, Application],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
});

export async function initializeDatabase(): Promise<DataSource> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log("PostgreSQL connected successfully");
  }
  return AppDataSource;
}
