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

  @Get("era/:eraId")
  findByEra(
    @Param("eraId", ParseIntPipe) eraId: number
  ): Promise<Composer[]> {
    return this.composerService.findByEra(eraId);
  }

  @Get("filter")
  async filter(
    @Query() query: Record<string, string>
  ): Promise<Composer[]> {
    return this.composerService.filter(query);
  }

  // Unique @Get because no direct relation (can't use filter method)
  @Get("by-grade")
  async findAllByGrade(
    @Query("gradeId", ParseIntPipe) gradeId: number
  ): Promise<Composer[]> {
    return this.composerService.findAllByGrade(gradeId);
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number
  ): Promise<Composer> {
    return this.composerService.findOne(id);
  }
}
