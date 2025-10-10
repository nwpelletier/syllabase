import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Piece } from "./piece.entity";
import { Composer } from "../composer/composer.entity";
import { CreatePieceDto } from "./dto/create-piece.dto";

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
