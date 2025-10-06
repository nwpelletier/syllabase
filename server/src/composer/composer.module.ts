import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Composer } from "./composer.entity";
import { Collection } from "../collection/collection.entity";
import { Piece } from "../piece/piece.entity";
import { ComposerService } from "./composer.service";
import { ComposerController } from "./composer.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Composer, Collection, Piece]),
  ],
  controllers: [ComposerController],
  providers: [ComposerService],
  exports: [ComposerService],
})
export class ComposerModule {}
