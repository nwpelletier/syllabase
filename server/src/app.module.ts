import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { PieceModule } from "./piece/piece.module";
import { ComposerModule } from "./composer/composer.module";
import { CollectionModule } from "./collection/collection.module";
import { EraModule } from "./era/era.module";
import { Piece } from "./piece/piece.entity";
import { Composer } from "./composer/composer.entity";
import { Collection } from "./collection/collection.entity";
import { Era } from "./era/era.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "Montreal89!",
      database: "Syllabase",
      schema: "syllabus_data",
      synchronize: false,
      entities: [Piece, Composer, Collection, Era],
    }),
    PieceModule,
    ComposerModule,
    EraModule,
    CollectionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
