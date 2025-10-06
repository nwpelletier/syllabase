// src/piece/piece.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Piece } from "./piece.entity";
import { Composer } from "../composer/composer.entity";
import { Collection } from "../collection/collection.entity";
import { PieceService } from "./piece.service";
import { PieceController } from "./piece.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Piece, Composer, Collection]),
  ],
  controllers: [PieceController],
  providers: [PieceService],
  exports: [PieceService], // export if used elsewhere
})
export class PieceModule {}
