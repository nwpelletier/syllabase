import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PieceSyllabus } from "./piece_syllabus.entity";
import { CreatePieceSyllabusDto } from "./dto/create-piece_syllabus.dto";

@Injectable()
export class PieceSyllabusService {
  constructor(
    @InjectRepository(PieceSyllabus)
    private readonly repo: Repository<PieceSyllabus>
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
    if (
      !dto.pieceId &&
      !dto.collectionId &&
      !dto.syllabusId &&
      !dto.gradeId
    ) {
      throw new Error(
        "At least one of piece, collection, syllabus, or grade must be provided."
      );
    }

    const entry = this.repo.create({
      piece: dto.pieceId ? { id: dto.pieceId } : undefined,
      syllabus: dto.syllabusId
        ? { id: dto.syllabusId }
        : undefined,
      grade: dto.gradeId ? { id: dto.gradeId } : undefined,
      collection: dto.collectionId
        ? { id: dto.collectionId }
        : undefined,
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
