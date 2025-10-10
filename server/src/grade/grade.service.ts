import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grade } from "./grade.entity";
import { CreateGradeDto } from "./dto/create-grade.dto";

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepository: Repository<Grade>
  ) {}

  findAll(): Promise<Grade[]> {
    return this.gradeRepository.find({
      relations: ["syllabus"],
    });
  }

  async findOne(id: number): Promise<Grade> {
    const grade = await this.gradeRepository.findOne({
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
    const grade = this.gradeRepository.create({
      grade: dto.name,
      syllabus: dto.syllabusId
        ? { id: dto.syllabusId }
        : undefined,
    });

    return this.gradeRepository.save(grade);
  }
}
