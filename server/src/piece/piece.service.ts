// src/piece/piece.service.ts
import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Piece } from "./piece.entity";
import { Composer } from "../composer/composer.entity";
import { Collection } from "../collection/collection.entity";
import { CreatePieceDto } from "./dto/create-piece.dto";

@Injectable()
export class PieceService {
  constructor(
    @InjectRepository(Piece)
    private readonly pieceRepo: Repository<Piece>,
    @InjectRepository(Composer)
    private readonly composerRepo: Repository<Composer>,
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>
  ) {}

  findAll(): Promise<Piece[]> {
    return this.pieceRepo.find({
      relations: ["composer", "collection"],
    });
  }

  async findOne(id: number): Promise<Piece> {
    const piece = await this.pieceRepo.findOne({
      where: { id },
      relations: ["composer", "collection"],
    });
    if (!piece) {
      throw new NotFoundException(
        `Piece with id ${id} not found`
      );
    }
    return piece;
  }

  async create(dto: CreatePieceDto): Promise<Piece> {
    const composer = dto.composerId
      ? await this.composerRepo.findOneBy({
          id: dto.composerId,
        })
      : undefined;

    const collection = dto.collectionId
      ? await this.collectionRepo.findOneBy({
          id: dto.collectionId,
        })
      : undefined;

    const piece = this.pieceRepo.create({
      name: dto.name,
      composer: composer ?? undefined,
      collection: collection ?? undefined,
    });

    return this.pieceRepo.save(piece);
  }
}
