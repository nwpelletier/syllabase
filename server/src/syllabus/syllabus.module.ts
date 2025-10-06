// src/piece/piece.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Syllabus } from "./syllabus.entity";
import { SyllabusService } from "./syllabus.service";
import { SyllabusController } from "./syllabus.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Syllabus])],
  controllers: [SyllabusController],
  providers: [SyllabusService],
  exports: [SyllabusService],
})
export class SyllabusModule {}
