import { Type } from "class-transformer";
import { ValidateNested, IsArray } from "class-validator";
import { CreateEraDto } from "./create-era.dto";

export class CreateManyErasDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEraDto)
  eras!: CreateEraDto[];
}
