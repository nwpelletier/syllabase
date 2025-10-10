import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Composer } from "./composer.entity";
import { Piece } from "../piece/piece.entity";
import { Collection } from "../collection/collection.entity";
import { Era } from "../era/era.entity";
import { PieceSyllabus } from "../piece_syllabus/piece_syllabus.entity";
import { CreateComposerDto } from "./dto/create-composer.dto";
import { applyFilters } from "../common/generic-filter";

@Injectable()
export class ComposerService {
  constructor(
    @InjectRepository(Composer)
    private composerRepository: Repository<Composer>,
    @InjectRepository(Piece)
    private pieceRepository: Repository<Piece>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
    @InjectRepository(PieceSyllabus)
    private pieceSyllabiRepository: Repository<PieceSyllabus>,
    @InjectRepository(Era)
    private eraRepository: Repository<Era>
  ) {}

  findAll(): Promise<Composer[]> {
    return this.composerRepository.find();
  }

  async findOne(id: number): Promise<Composer> {
    const composer = await this.composerRepository.findOne({
      where: { id },
      relations: ["pieces", "collections"],
    });
    if (!composer) {
      throw new NotFoundException(
        `Composer with ID ${id} not found`
      );
    }
    return composer;
  }

  async findByEra(eraId: number): Promise<Composer[]> {
    return this.composerRepository.find({
      where: { era: { id: eraId } },
      relations: ["era"],
    });
  }

  async findAllByGrade(
    gradeId: number
  ): Promise<Composer[]> {
    const entries = await this.pieceSyllabiRepository
      .createQueryBuilder("ps")
      .leftJoinAndSelect("ps.piece", "piece")
      .leftJoinAndSelect("ps.collection", "collection")
      .leftJoinAndSelect("piece.composer", "pieceComposer")
      .leftJoinAndSelect(
        "collection.composer",
        "collectionComposer"
      )
      .where("ps.grade_id = :gradeId", { gradeId })
      .getMany();

    const uniqueComposers = Array.from(
      new Map(
        entries
          .flatMap((ps) => [
            ps.piece?.composer,
            ps.collection?.composer,
          ])
          .filter((c): c is Composer => !!c)
          .map((c) => [c.id, c])
      ).values()
    );

    return uniqueComposers;
  }

  async filter(
    query: Record<string, string>
  ): Promise<Composer[]> {
    return applyFilters(
      this.composerRepository,
      query,
      ["eraId"],
      [{ relation: "era", alias: "era" }],
      {
        eraId: "era.id",
      }
    );
  }

  async create(dto: CreateComposerDto): Promise<Composer> {
    const composer = this.composerRepository.create({
      first_name: dto.firstName,
      last_name: dto.lastName,
      birth_year: dto.birthYear,
      death_year: dto.deathYear,
      nationality: dto.nationality,
    });
    return this.composerRepository.save(composer);
  }
}
