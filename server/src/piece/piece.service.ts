import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Piece } from "./piece.entity";
import { CreatePieceDto } from "./dto/create-piece.dto";
import { applyFilters } from "../common/generic-filter";

@Injectable()
export class PieceService {
  constructor(
    @InjectRepository(Piece)
    private readonly pieceRepository: Repository<Piece>
  ) {}

  findAll(): Promise<Piece[]> {
    return this.pieceRepository.find({
      relations: ["composer"],
    });
  }

  async findOne(id: number): Promise<Piece> {
    const piece = await this.pieceRepository.findOne({
      where: { id },
      relations: [
        "composer",
        "pieceSyllabi",
        "pieceSyllabi.collection",
      ],
    });

    if (!piece) {
      throw new NotFoundException(
        `Piece with id ${id} not found`
      );
    }

    return piece;
  }

  async filter(
    query: Record<string, string>
  ): Promise<Piece[]> {
    const qb =
      this.pieceRepository.createQueryBuilder("piece");

    qb.leftJoinAndSelect("piece.composer", "composer");
    qb.leftJoinAndSelect("piece.pieceSyllabi", "ps");

    if (query.composerId) {
      qb.andWhere("composer.id = :composerId", {
        composerId: query.composerId,
      });
    }

    if (query.collectionId) {
      qb.andWhere("ps.collection_id = :collectionId", {
        collectionId: query.collectionId,
      });
    }

    return qb.getMany();
  }

  async create(dto: CreatePieceDto): Promise<Piece> {
    const piece = this.pieceRepository.create({
      name: dto.name,
      composer: dto.composerId
        ? { id: dto.composerId }
        : undefined,
    });
    return this.pieceRepository.save(piece);
  }
}
