import "reflect-metadata";
import { Container } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "./types.js";
import { UserRepository } from "../repository/user.repository.js";
import { CompanyRepository } from "../repository/company.repository.js";
import { JobRepository } from "../repository/job.repository.js";
import { ApplicationRepository } from "../repository/application.repository.js";
import { UserUseCase } from "../usecase/user.usecase.js";
import { CompanyUseCase } from "../usecase/company.usecase.js";
import { JobUseCase } from "../usecase/job.usecase.js";
import { ApplicationUseCase } from "../usecase/application.usecase.js";
import { UserController } from "../controller/user.controller.js";
import { CompanyController } from "../controller/company.controller.js";
import { JobController } from "../controller/job.controller.js";
import { ApplicationController } from "../controller/application.controller.js";

export function createContainer(dataSource: DataSource): Container {
  const container = new Container();

  container.bind<DataSource>(TYPES.DataSource).toConstantValue(dataSource);

  container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
  container.bind<CompanyRepository>(TYPES.CompanyRepository).to(CompanyRepository);
  container.bind<JobRepository>(TYPES.JobRepository).to(JobRepository);
  container.bind<ApplicationRepository>(TYPES.ApplicationRepository).to(ApplicationRepository);

  container.bind<UserUseCase>(TYPES.UserUseCase).to(UserUseCase);
  container.bind<CompanyUseCase>(TYPES.CompanyUseCase).to(CompanyUseCase);
  container.bind<JobUseCase>(TYPES.JobUseCase).to(JobUseCase);
  container.bind<ApplicationUseCase>(TYPES.ApplicationUseCase).to(ApplicationUseCase);

  container.bind<UserController>(TYPES.UserController).to(UserController);
  container.bind<CompanyController>(TYPES.CompanyController).to(CompanyController);
  container.bind<JobController>(TYPES.JobController).to(JobController);
  container.bind<ApplicationController>(TYPES.ApplicationController).to(ApplicationController);

  return container;
}
