// composer.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Era } from "../era/era.entity";

@Entity()
export class Composer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  birthYear!: number;

  @Column({ nullable: true })
  deathYear?: number;

  @Column()
  nationality!: string;

  @ManyToOne(() => Era, (era) => era.composers, {
    nullable: false,
  })
  @JoinColumn({ name: "eraId" })
  era!: Era;
}
