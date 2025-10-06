import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Composer } from "../composer/composer.entity";

@Entity({ name: "collections" })
export class Collection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Composer, { nullable: false })
  @JoinColumn({ name: "composer_id" })
  composer!: Composer;
}
