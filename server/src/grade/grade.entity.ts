import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Syllabus } from "../syllabus/syllabus.entity";
import { PieceSyllabus } from "../piece_syllabus/piece_syllabus.entity";

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

  @OneToMany(() => PieceSyllabus, (ps) => ps.piece)
  pieceSyllabi!: PieceSyllabus[];
}
