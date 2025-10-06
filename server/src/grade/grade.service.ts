import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grade } from "./grade.entity";
import { Syllabus } from "../syllabus/syllabus.entity";
import { CreateGradeDto } from "./dto/create-grade.dto";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>,
    @InjectRepository(Syllabus)
    private readonly syllabusRepo: Repository<Syllabus>
  ) {}

  findAll(): Promise<Grade[]> {
    return this.gradeRepo.find({
      relations: ["syllabus"],
    });
  }

  async findOne(id: number): Promise<Grade> {
    const grade = await this.gradeRepo.findOne({
      where: { id },
      relations: ["syllabus"],
    });
    if (!grade) {
      throw new NotFoundException(
        `Grade with id ${id} not found`
      );
    }
    return grade;
  }

  async create(dto: CreateGradeDto): Promise<Grade> {
    const syllabus = dto.syllabusId
      ? await this.gradeRepo.findOneBy({
          id: dto.syllabusId,
        })
      : undefined;

    const grade = this.gradeRepo.create({
      grade: dto.name,
      syllabus: syllabus ?? undefined,
    });
    return this.gradeRepo.save(grade);
  }
}
