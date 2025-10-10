import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Composer } from "../composer/composer.entity";

@Entity({ name: "eras", schema: "public" }) // <-- explicitly set schema
export class Era {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  // Optional: if you want composers linked to eras
  @OneToMany(() => Composer, (composer) => composer.era)
  composers!: Composer[];
}
