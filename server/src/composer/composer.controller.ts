import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { ComposerService } from "./composer.service";
import { Composer } from "./composer.entity";
import { CreateComposerDto } from "./dto/create-composer.dto";

@Controller("composers")
export class ComposerController {
  constructor(
    private readonly composerService: ComposerService
  ) {}

  @Post()
  create(
    @Body() dto: CreateComposerDto
  ): Promise<Composer> {
    return this.composerService.create(dto);
  }

  @Get()
  findAll(): Promise<Composer[]> {
    return this.composerService.findAll();
  }

  @Get("id/:id")
  findOne(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Composer> {
    return this.composerService.findOne(id);
  }

  @Get("era/:eraId")
  findByEra(
    @Param("eraId", ParseIntPipe) eraId: number
  ): Promise<Composer[]> {
    return this.composerService.findByEra(eraId);
  }

  @Get("filter")
  async findBySyllabusAndGrade(
    @Query("syllabusId", ParseIntPipe) syllabusId: number,
    @Query("gradeId", ParseIntPipe) gradeId: number
  ): Promise<Composer[]> {
    return this.composerService.findBySyllabusAndGrade(
      syllabusId,
      gradeId
    );
  }
}
