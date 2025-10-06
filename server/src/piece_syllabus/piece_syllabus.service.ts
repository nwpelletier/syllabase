import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PieceSyllabus } from "./piece_syllabus.entity";
import { CreatePieceSyllabusDto } from "./dto/create-piece_syllabus.dto";
import { Piece } from "../piece/piece.entity";
import { Syllabus } from "../syllabus/syllabus.entity";
import { Grade } from "../grade/grade.entity";
import { Collection } from "../collection/collection.entity";

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
    const piece = await this.pieceRepo.findOneBy({
      id: dto.pieceId,
    });
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

    const entry = this.repo.create({
      piece,
      syllabus,
      grade,
      collection,
    });
    return this.repo.save(entry);
  }
}
