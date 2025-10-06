import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grade } from "./grade.entity";
import { Syllabus } from "../syllabus/syllabus.entity";
import { GradeService } from "./grade.service";
import { GradeController } from "./grade.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Grade, Syllabus])],
  controllers: [GradeController],
  providers: [GradeService],
  exports: [GradeService],
})
export class GradeModule {}
