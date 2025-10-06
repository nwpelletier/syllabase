import {
  Controller,
  Get,
  Post,
  Body,
} from "@nestjs/common";
import { PieceSyllabusService } from "./piece_syllabus.service";
import { CreatePieceSyllabusDto } from "./dto/create-piece_syllabus.dto";
import { PieceSyllabus } from "./piece_syllabus.entity";

@Controller("piece-syllabi")
export class PieceSyllabusController {
  constructor(
    private readonly service: PieceSyllabusService
  ) {}

  @Get()
  findAll(): Promise<PieceSyllabus[]> {
    return this.service.findAll();
  }

  @Post()
  create(
    @Body() dto: CreatePieceSyllabusDto
  ): Promise<PieceSyllabus> {
    return this.service.create(dto);
  }
}
