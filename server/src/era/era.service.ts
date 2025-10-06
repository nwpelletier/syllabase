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
    private readonly eraRepo: Repository<Era>
  ) {}

  findAll(): Promise<Era[]> {
    return this.eraRepo.find();
  }

  async create(dto: CreateEraDto): Promise<Era> {
    const era = this.eraRepo.create(dto);
    return this.eraRepo.save(era);
  }
}
