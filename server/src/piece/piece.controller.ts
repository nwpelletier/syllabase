import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { PieceService } from "./piece.service";
import { Piece } from "./piece.entity";
import { CreatePieceDto } from "./dto/create-piece.dto";

@Controller("pieces")
export class PieceController {
  constructor(
    private readonly pieceService: PieceService
  ) {}

  @Post()
  create(@Body() dto: CreatePieceDto): Promise<Piece> {
    return this.pieceService.create(dto);
  }

  @Get()
  findAll(): Promise<Piece[]> {
    return this.pieceService.findAll();
  }

  @Get("composer/:composerId")
  findByEra(
    @Param("composerId", ParseIntPipe) composerId: number
  ): Promise<Piece[]> {
    return this.pieceService.findByComposer(composerId);
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Piece> {
    return this.pieceService.findOne(Number(id));
  }
}
