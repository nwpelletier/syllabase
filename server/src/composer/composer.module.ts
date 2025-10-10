import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Composer } from "./composer.entity";
import { Collection } from "../collection/collection.entity";
import { Piece } from "../piece/piece.entity";
import { Era } from "../era/era.entity";
import { ComposerService } from "./composer.service";
import { ComposerController } from "./composer.controller";
import { PieceSyllabus } from "../piece_syllabus/piece_syllabus.entity";
import { PieceController } from "../piece/piece.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Composer,
      Collection,
      Piece,
      PieceSyllabus,
      Era,
    ]),
  ],
  controllers: [ComposerController],
  providers: [ComposerService],
  exports: [ComposerService],
})
export class ComposerModule {}
