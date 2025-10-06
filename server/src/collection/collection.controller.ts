import {
  Controller,
  Post,
  Body,
  Get,
  Param,
} from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { Collection } from "./collection.entity";
import { CreateCollectionDto } from "./dto/create-collection.dto";

@Controller("collections")
export class CollectionController {
  constructor(
    private readonly collectionService: CollectionService
  ) {}

  @Post()
  create(
    @Body() dto: CreateCollectionDto
  ): Promise<Collection> {
    return this.collectionService.create(dto);
  }

  @Get()
  findAll(): Promise<Collection[]> {
    return this.collectionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Collection> {
    return this.collectionService.findOne(Number(id));
  }
}
