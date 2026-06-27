import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Company } from "./Company.entity.js";
import { User } from "./User.entity.js";
import { Application } from "./Application.entity.js";

@Entity("jobs")
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  title!: string;

  @Column("text")
  description!: string;

  @Column("simple-array", { nullable: true })
  requirements!: string[] | null;

  @Column("decimal", { precision: 12, scale: 2 })
  salary!: number;

  @Column("int")
  experienceLevel!: number;

  @Column("varchar")
  location!: string;

  @Column("varchar")
  jobType!: string;

  @Column("int")
  position!: number;

  @Column("uuid")
  companyId!: string;

  @ManyToOne(() => Company, (company) => company.jobs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "companyId" })
  company!: Company;

  @Column("uuid")
  createdById!: string;

  @ManyToOne(() => User, (user) => user.createdJobs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "createdById" })
  createdBy!: User;

  @OneToMany(() => Application, (app) => app.job)
  applications!: Application[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
