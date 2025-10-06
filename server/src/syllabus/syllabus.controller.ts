import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from "@nestjs/common";
import { SyllabusService } from "./syllabus.service";
import { Syllabus } from "./syllabus.entity";
import { CreateSyllabusDto } from "./dto/create-syllabus.dto";

@Controller("syllabi")
export class SyllabusController {
  constructor(
    private readonly syllabusService: SyllabusService
  ) {}

  @Post()
  create(
    @Body() dto: CreateSyllabusDto
  ): Promise<Syllabus> {
    return this.syllabusService.create(dto);
  }

  @Get()
  findAll(): Promise<Syllabus[]> {
    return this.syllabusService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Syllabus> {
    return this.syllabusService.findOne(id);
  }
}
