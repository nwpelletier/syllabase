// composer/dto/create-composer.dto.ts
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateComposerDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsOptional()
  birthYear?: number;

  @IsOptional()
  deathYear?: number;

  @IsOptional()
  nationality?: string;

  @IsInt()
  @IsNotEmpty()
  eraId!: number; // just the id
}
