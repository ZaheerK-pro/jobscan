import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import type { UserRole } from "../type/user.types.js";
import { Company } from "./Company.entity.js";
import { Job } from "./Job.entity.js";
import { Application } from "./Application.entity.js";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  fullname!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column("varchar")
  phoneNumber!: string;

  @Column("varchar")
  password!: string;

  @Column({ type: "varchar", length: 20 })
  role!: UserRole;

  @Column({ type: "text", nullable: true })
  bio!: string | null;

  @Column("simple-array", { nullable: true })
  skills!: string[] | null;

  @Column({ type: "varchar", nullable: true })
  resume!: string | null;

  @Column({ type: "varchar", nullable: true })
  resumeOriginalName!: string | null;

  @Column({ type: "varchar", nullable: true, default: "" })
  profilePhoto!: string;

  @Column({ type: "uuid", nullable: true })
  companyId!: string | null;

  @OneToOne(() => Company, { nullable: true })
  @JoinColumn({ name: "companyId" })
  company!: Company | null;

  @OneToMany(() => Job, (job) => job.createdBy)
  createdJobs!: Job[];

  @OneToMany(() => Application, (app) => app.applicant)
  applications!: Application[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
