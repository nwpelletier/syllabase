import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Syllabus } from "./syllabus.entity";
import { CreateSyllabusDto } from "./dto/create-syllabus.dto";

@Injectable()
export class SyllabusService {
  constructor(
    @InjectRepository(Syllabus)
    private readonly syllabusRepo: Repository<Syllabus>
  ) {}

  findAll(): Promise<Syllabus[]> {
    return this.syllabusRepo.find();
  }

  async findOne(id: number): Promise<Syllabus> {
    const syllabus = await this.syllabusRepo.findOne({
      where: { id },
    });
    if (!syllabus) {
      throw new NotFoundException(
        `Syllabus with id ${id} not found`
      );
    }
    return syllabus;
  }

  async create(dto: CreateSyllabusDto): Promise<Syllabus> {
    const piece = this.syllabusRepo.create({
      name: dto.name,
      country: dto.country,
    });

    return this.syllabusRepo.save(piece);
  }
}
