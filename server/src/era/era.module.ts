// src/piece/piece.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Era } from "./era.entity";
import { EraService } from "./era.service";
import { EraController } from "./era.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Era])],
  controllers: [EraController],
  providers: [EraService],
  exports: [EraService],
})
export class EraModule {}
