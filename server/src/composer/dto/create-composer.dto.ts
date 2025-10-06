import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

import { Type } from "class-transformer";

export class CreateComposerDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsInt()
  @Type(() => Number)
  birthYear!: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  deathYear?: number;

  @IsString()
  nationality!: string;
}
