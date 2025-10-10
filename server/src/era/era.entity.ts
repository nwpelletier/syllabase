import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Composer } from "../composer/composer.entity";

@Entity({ name: "eras" })
export class Era {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(
    () => Composer,
    (composer: Composer) => composer.era
  )
  composers!: Composer[];
}
