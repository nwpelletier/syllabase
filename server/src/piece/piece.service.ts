import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Piece } from "./piece.entity";
import { Composer } from "../composer/composer.entity";
import { CreatePieceDto } from "./dto/create-piece.dto";
import { applyFilters } from "../common/generic-filter";

@Injectable()
export class PieceService {
  constructor(
    @InjectRepository(Piece)
    private readonly pieceRepository: Repository<Piece>,
    @InjectRepository(Composer)
    private readonly composerRepository: Repository<Composer>
  ) {}

  findAll(): Promise<Piece[]> {
    return this.pieceRepository.find({
      relations: ["composer"],
    });
  }

  async findOne(id: number): Promise<Piece> {
    const piece = await this.pieceRepository.findOne({
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

  async findByComposer(
    composerId: number
  ): Promise<Piece[]> {
    return this.pieceRepository.find({
      where: { composer: { id: composerId } },
      relations: ["composer"],
    });
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
    const composer = dto.composerId
      ? await this.composerRepository.findOneBy({
          id: dto.composerId,
        })
      : undefined;

    const piece = this.pieceRepository.create({
      name: dto.name,
      composer: composer ?? undefined,
    });

    return this.pieceRepository.save(piece);
  }
}
