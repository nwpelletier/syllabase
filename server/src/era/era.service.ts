import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Era } from "./era.entity";
import { CreateEraDto } from "./dto/create-era.dto";

@Injectable()
export class EraService {
  constructor(
    @InjectRepository(Era)
    private readonly eraRepository: Repository<Era>
  ) {}

  findAll(): Promise<Era[]> {
    return this.eraRepository.find();
  }

  async findOne(id: number): Promise<Era> {
    const era = await this.eraRepository.findOne({
      where: { id },
    });
    if (!era) {
      throw new NotFoundException(
        `Era with ID ${id} not found`
      );
    }
    return era;
  }

  async create(dto: CreateEraDto): Promise<Era> {
    const era = this.eraRepository.create(dto);
    return this.eraRepository.save(era);
  }
}
