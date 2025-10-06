import {
  IsNotEmpty,
  IsInt,
  IsString,
} from "class-validator";

export class CreateGradeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsInt()
  @IsNotEmpty()
  syllabusId!: number;

  @IsInt()
  @IsNotEmpty()
  gradeLevel!: number;
}
