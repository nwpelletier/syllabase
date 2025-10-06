import {
  IsInt,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class CreatePieceSyllabusDto {
  @IsOptional()
  @IsInt()
  pieceId?: number;

  @IsOptional()
  @IsInt()
  collectionId?: number;

  @IsOptional()
  @IsInt()
  syllabusId?: number;

  @IsOptional()
  @IsInt()
  gradeId?: number;
}
