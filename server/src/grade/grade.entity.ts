import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Syllabus } from "../syllabus/syllabus.entity";

@Entity({ name: "grades" })
export class Grade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  grade!: string;

  @ManyToOne(() => Syllabus, { nullable: false })
  @JoinColumn({ name: "syllabus_id" })
  syllabus!: Syllabus;

  @Column()
  grade_level!: number;
}
