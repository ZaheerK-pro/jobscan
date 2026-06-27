import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import type { ApplicationStatus } from "../type/application.types.js";
import { Job } from "./Job.entity.js";
import { User } from "./User.entity.js";

@Entity("applications")
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("uuid")
  jobId!: string;

  @ManyToOne(() => Job, (job) => job.applications, { onDelete: "CASCADE" })
  @JoinColumn({ name: "jobId" })
  job!: Job;

  @Column("uuid")
  applicantId!: string;

  @ManyToOne(() => User, (user) => user.applications, { onDelete: "CASCADE" })
  @JoinColumn({ name: "applicantId" })
  applicant!: User;

  @Column({ type: "varchar", length: 20, default: "pending" })
  status!: ApplicationStatus;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
