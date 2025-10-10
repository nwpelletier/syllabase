// src/app.module.ts
import { Module } from "@nestjs/common";
import {
  ConfigModule,
  ConfigService,
} from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { PieceModule } from "./piece/piece.module";
import { ComposerModule } from "./composer/composer.module";
import { EraModule } from "./era/era.module";
import { CollectionModule } from "./collection/collection.module";
import { GradeModule } from "./grade/grade.module";
import { SyllabusModule } from "./syllabus/syllabus.module";
import { PieceSyllabusModule } from "./piece_syllabus/piece_syllabus.module";

import { Piece } from "./piece/piece.entity";
import { Composer } from "./composer/composer.entity";
import { Collection } from "./collection/collection.entity";
import { Era } from "./era/era.entity";
import { Grade } from "./grade/grade.entity";
import { Syllabus } from "./syllabus/syllabus.entity";
import { PieceSyllabus } from "./piece_syllabus/piece_syllabus.entity";

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: "syllabasedb-syllabasedb01.b.aivencloud.com",
        port: 11003,
        username: "avnadmin",
        password: configService.get("DB_PASS"),
        database: "defaultdb",
        ssl: {
          rejectUnauthorized: false,
        },
        schema: "public",
        synchronize: true,
        entities: [
          Piece,
          Composer,
          Collection,
          Era,
          Grade,
          Syllabus,
          PieceSyllabus,
        ],
      }),
    }),

    PieceModule,
    ComposerModule,
    EraModule,
    CollectionModule,
    GradeModule,
    SyllabusModule,
    PieceSyllabusModule,
  ],
})
export class AppModule {}
