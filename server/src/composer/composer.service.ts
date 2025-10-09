import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Composer } from "./composer.entity";
import { Piece } from "../piece/piece.entity";
import { Collection } from "../collection/collection.entity";
import { PieceSyllabus } from "../piece_syllabus/piece_syllabus.entity";
import { CreateComposerDto } from "./dto/create-composer.dto";

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
    private pieceSyllabiRepository: Repository<PieceSyllabus>
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

  async findBySyllabusAndGrade(
    syllabusId: number,
    gradeId: number
  ): Promise<Composer[]> {
    console.log("Selected syllabusId:", syllabusId);
    console.log("Selected gradeId:", gradeId);

    const entries = await this.pieceSyllabiRepository
      .createQueryBuilder("ps")
      .leftJoinAndSelect("ps.piece", "piece")
      .leftJoinAndSelect("ps.collection", "collection")
      .leftJoinAndSelect("piece.composer", "pieceComposer")
      .leftJoinAndSelect(
        "collection.composer",
        "collectionComposer"
      )
      .where("ps.syllabus_id = :syllabusId", { syllabusId })
      .andWhere("ps.grade_id = :gradeId", { gradeId })
      .getMany();

    console.log(
      "Querying the following pieces:",
      entries.map((ps) => ps.piece?.name).filter(Boolean)
    );
    console.log(
      "Querying the following collections:",
      entries
        .map((ps) => ps.collection?.name)
        .filter(Boolean)
    );

    const composers = entries
      .map((ps) => [
        ps.piece?.composer,
        ps.collection?.composer,
      ])
      .flat()
      .filter((c): c is Composer => !!c);

    const uniqueComposers = composers.filter(
      (c, i, arr) =>
        arr.findIndex((x) => x.id === c.id) === i
    );

    return uniqueComposers;
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
