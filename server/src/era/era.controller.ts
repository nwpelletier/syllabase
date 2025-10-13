import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from "@nestjs/common";
import { EraService } from "./era.service";
import { Era } from "./era.entity";
import { CreateEraDto } from "./dto/create-era.dto";
import { CreateManyErasDto } from "./dto/create-many-eras.dto";

@Controller("eras")
export class EraController {
  constructor(private readonly eraService: EraService) {}

  @Post()
  create(@Body() dto: CreateEraDto): Promise<Era> {
    return this.eraService.create(dto);
  }

  @Post("many")
  createMany(
    @Body() dto: CreateManyErasDto
  ): Promise<Era[]> {
    return this.eraService.createMany(dto.eras);
  }

  @Get()
  findAll(): Promise<Era[]> {
    return this.eraService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Era> {
    return this.eraService.findOne(id);
  }
}
