import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { Piece } from "./entities/piece.entity"; // we'll create this
import { Collection } from "./entities/collection.entity"; // also create this
import { Composer } from "./entities/composer.entity"; // also create this

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
      entities: [Piece, Collection, Composer],
      synchronize: false, // set true only in dev; creates tables automatically
    }),
    TypeOrmModule.forFeature([Piece, Collection, Composer]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
