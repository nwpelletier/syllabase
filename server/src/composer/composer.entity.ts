// src/entities/composer.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Piece } from "../piece/piece.entity";
import { Collection } from "../collection/collection.entity";
import { Era } from "../era/era.entity";

@Entity({ name: "composers" })
export class Composer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column({ type: "int", nullable: true })
  birth_year?: number;

  @Column({ type: "int", nullable: true })
  death_year?: number;

  @Column({ nullable: true })
  nationality?: string;

  @ManyToOne(() => Era)
  @JoinColumn({ name: "era_id" })
  era?: Era;

  @OneToMany(() => Piece, (piece) => piece.composer)
  pieces!: Piece[];

  @OneToMany(
    () => Collection,
    (collection: Collection) => collection.composer
  )
  collections!: Collection[];
}
