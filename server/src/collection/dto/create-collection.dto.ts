import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @IsNotEmpty()
  composerId!: number;
}
