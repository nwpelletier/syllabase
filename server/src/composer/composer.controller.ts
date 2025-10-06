import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from "@nestjs/common";
import { ComposerService } from "./composer.service";
import { Composer } from "./composer.entity";
// import { CreateComposerDto } from "./dto/create-composer.dto";

@Controller("composers")
export class ComposerController {
  constructor(
    private readonly composerService: ComposerService
  ) {}

  @Get()
  findAll(): Promise<Composer[]> {
    return this.composerService.findAll();
  }
}
