import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
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

  @Get("filter")
  async filter(
    @Query() query: Record<string, string>
  ): Promise<Piece[]> {
    return this.pieceService.filter(query);
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Piece> {
    return this.pieceService.findOne(Number(id));
  }
}
