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

  async findAll(): Promise<Era[]> {
    console.log(
      "[EraService] Running findAll query for eras..."
    );
    const eras = await this.eraRepository.find();
    console.log("[EraService] Returned eras:", eras);
    return eras;
  }

  async findOne(id: number): Promise<Era> {
    console.log(
      `[EraService] Running findOne query for era id=${id}...`
    );
    const era = await this.eraRepository.findOne({
      where: { id },
      relations: ["composers"],
    });
    if (!era) {
      console.log(
        `[EraService] Era with id=${id} not found`
      );
      throw new NotFoundException(
        `Era with ID ${id} not found`
      );
    }
    console.log("[EraService] Found era:", era);
    return era;
  }

  async create(dto: CreateEraDto): Promise<Era> {
    const era = this.eraRepository.create(dto);
    const saved = await this.eraRepository.save(era);
    console.log("[EraService] Created new era:", saved);
    return saved;
  }
}
