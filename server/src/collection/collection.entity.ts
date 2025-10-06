import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Composer } from "../composer/composer.entity";
import { PieceSyllabus } from "../piece_syllabus/piece_syllabus.entity";

@Entity({ name: "collections" })
export class Collection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Composer, { nullable: false })
  @JoinColumn({ name: "composer_id" })
  composer!: Composer;

  @OneToMany(() => PieceSyllabus, (ps) => ps.piece)
  pieceSyllabi!: PieceSyllabus[];
}
