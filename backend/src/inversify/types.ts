export const TYPES = {
  // DataSource
  DataSource: Symbol.for("DataSource"),

  // Repositories
  UserRepository: Symbol.for("UserRepository"),
  CompanyRepository: Symbol.for("CompanyRepository"),
  JobRepository: Symbol.for("JobRepository"),
  ApplicationRepository: Symbol.for("ApplicationRepository"),

  // Use cases
  UserUseCase: Symbol.for("UserUseCase"),
  CompanyUseCase: Symbol.for("CompanyUseCase"),
  JobUseCase: Symbol.for("JobUseCase"),
  ApplicationUseCase: Symbol.for("ApplicationUseCase"),

  // Controllers
  UserController: Symbol.for("UserController"),
  CompanyController: Symbol.for("CompanyController"),
  JobController: Symbol.for("JobController"),
  ApplicationController: Symbol.for("ApplicationController"),
};
