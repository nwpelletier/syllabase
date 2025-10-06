import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PieceSyllabus } from "./piece_syllabus.entity";
import { PieceSyllabusService } from "./piece_syllabus.service";
import { PieceSyllabusController } from "./piece_syllabus.controller";
import { Piece } from "../piece/piece.entity";
import { Syllabus } from "../syllabus/syllabus.entity";
import { Grade } from "../grade/grade.entity";
import { Collection } from "../collection/collection.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PieceSyllabus,
      Piece,
      Syllabus,
      Grade,
      Collection,
    ]),
  ],
  controllers: [PieceSyllabusController],
  providers: [PieceSyllabusService],
})
export class PieceSyllabusModule {}
