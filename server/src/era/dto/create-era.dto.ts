import { IsNotEmpty, IsString } from "class-validator";

export class CreateEraDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
