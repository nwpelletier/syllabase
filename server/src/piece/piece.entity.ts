import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Composer } from "../composer/composer.entity";
import { Collection } from "../collection/collection.entity";

@Entity({ name: "pieces" })
export class Piece {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Composer, { nullable: false })
  @JoinColumn({ name: "composer_id" })
  composer!: Composer;

  @ManyToOne(() => Collection, { nullable: true })
  @JoinColumn({ name: "collection_id" })
  collection?: Collection;
}
