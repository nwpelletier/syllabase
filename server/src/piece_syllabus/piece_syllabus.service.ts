import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PieceSyllabus } from "./piece_syllabus.entity";
import { CreatePieceSyllabusDto } from "./dto/create-piece_syllabus.dto";
import { Piece } from "../piece/piece.entity";
import { Syllabus } from "../syllabus/syllabus.entity";
import { Grade } from "../grade/grade.entity";
import { Collection } from "../collection/collection.entity";
import { Composer } from "../composer/composer.entity";

@Injectable()
export class PieceSyllabusService {
  constructor(
    @InjectRepository(PieceSyllabus)
    private readonly repo: Repository<PieceSyllabus>,

    @InjectRepository(Piece)
    private readonly pieceRepo: Repository<Piece>,

    @InjectRepository(Syllabus)
    private readonly syllabusRepo: Repository<Syllabus>,

    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>,

    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>
  ) {}

  // --- Existing methods ---

  async findAll(): Promise<PieceSyllabus[]> {
    return this.repo.find({
      relations: [
        "piece",
        "syllabus",
        "grade",
        "collection",
      ],
    });
  }

  async create(
    dto: CreatePieceSyllabusDto
  ): Promise<PieceSyllabus> {
    const piece = dto.pieceId
      ? await this.pieceRepo.findOneBy({ id: dto.pieceId })
      : undefined;

    const syllabus = dto.syllabusId
      ? await this.syllabusRepo.findOneBy({
          id: dto.syllabusId,
        })
      : undefined;

    const grade = dto.gradeId
      ? await this.gradeRepo.findOneBy({ id: dto.gradeId })
      : undefined;

    const collection = dto.collectionId
      ? await this.collectionRepo.findOneBy({
          id: dto.collectionId,
        })
      : undefined;

    if (!piece && !syllabus && !grade && !collection) {
      throw new Error(
        "At least one of piece, collection, syllabus, or grade must be provided."
      );
    }

    const entry = this.repo.create({
      piece,
      syllabus,
      grade,
      collection,
    });

    return this.repo.save(entry);
  }

  async getAllDetails() {
    return this.repo
      .createQueryBuilder("ps")
      .leftJoin("ps.piece", "p")
      .leftJoin("p.composer", "c")
      .leftJoin("ps.collection", "col")
      .leftJoin("ps.syllabus", "s")
      .leftJoin("ps.grade", "g")
      .select([
        'p.name AS "pieceName"',
        "COALESCE(c.first_name, '') || ' ' || COALESCE(c.last_name, '') AS \"composer\"",
        'col.name AS "collection"',
        's.name AS "syllabus"',
        'g.grade AS "grade"',
      ])
      .getRawMany();
  }
}
