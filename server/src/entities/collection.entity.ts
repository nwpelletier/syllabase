import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Composer } from "./composer.entity";
import { Piece } from "./piece.entity";

@Entity({ name: "collections" })
export class Collection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(
    () => Composer,
    (composer: Composer) => composer.collections
  )
  @JoinColumn({ name: "composer_id" })
  composer!: Composer;

  @OneToMany(
    () => Piece,
    (piece: Piece) => piece.collection
  )
  pieces!: Piece[];
}
