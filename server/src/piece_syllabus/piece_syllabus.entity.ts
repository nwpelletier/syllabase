import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Piece } from "../piece/piece.entity";
import { Collection } from "../collection/collection.entity";
import { Syllabus } from "../syllabus/syllabus.entity";
import { Grade } from "../grade/grade.entity";

@Entity({ name: "piece_syllabi" })
export class PieceSyllabus {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Piece, (piece) => piece.pieceSyllabi, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "piece_id" })
  piece?: Piece;

  @ManyToOne(
    () => Collection,
    (collection) => collection.pieceSyllabi,
    { nullable: true }
  )
  @JoinColumn({ name: "collection_id" })
  collection?: Collection;

  @ManyToOne(
    () => Syllabus,
    (syllabus) => syllabus.pieceSyllabi,
    { nullable: true }
  )
  @JoinColumn({ name: "syllabus_id" })
  syllabus?: Syllabus;

  @ManyToOne(() => Grade, (grade) => grade.pieceSyllabi, {
    nullable: true,
  })
  @JoinColumn({ name: "grade_id" })
  grade?: Grade;
}
