import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { PieceSyllabus } from "../piece_syllabus/piece_syllabus.entity";

@Entity({ name: "syllabi" })
export class Syllabus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  country!: string;

  @OneToMany(() => PieceSyllabus, (ps) => ps.piece)
  pieceSyllabi!: PieceSyllabus[];
}
