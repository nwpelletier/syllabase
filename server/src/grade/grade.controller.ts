import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from "@nestjs/common";
import { GradeService } from "./grade.service";
import { Grade } from "./grade.entity";
import { CreateGradeDto } from "./dto/create-grade.dto";

@Controller("grades")
export class GradeController {
  constructor(
    private readonly gradeService: GradeService
  ) {}

  @Post()
  create(@Body() dto: CreateGradeDto): Promise<Grade> {
    return this.gradeService.create(dto);
  }

  @Get()
  findAll(): Promise<Grade[]> {
    return this.gradeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Grade> {
    return this.gradeService.findOne(Number(id));
  }
}
