import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreatePieceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @IsNotEmpty()
  composerId!: number;

  @IsInt()
  @IsOptional()
  collectionId?: number;
}
