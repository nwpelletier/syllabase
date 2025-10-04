// src/app.controller.ts
import { Controller, Get } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Piece } from "./entities/piece.entity";

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Piece)
    private readonly pieceRepo: Repository<Piece>
  ) {}

  @Get("ping")
  ping() {
    return {
      message:
        "This message was delivered to the front end",
    };
  }

  @Get("hello")
  hello() {
    return { message: "Hello from Nest.js backend!" };
  }

  @Get("pieces")
  async getPieces() {
    const pieces = await this.pieceRepo.find({
      relations: ["composer", "collection"],
    });
    console.log("All pieces:", pieces);
    return pieces;
  }
}
