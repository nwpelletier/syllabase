import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Piece } from "./piece.entity";
import { Composer } from "../composer/composer.entity";
import { PieceService } from "./piece.service";
import { PieceController } from "./piece.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Piece, Composer])],
  controllers: [PieceController],
  providers: [PieceService],
  exports: [PieceService],
})
export class PieceModule {}
