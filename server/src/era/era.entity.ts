import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "eras" })
export class Era {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;
}
