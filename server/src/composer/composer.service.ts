import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Composer } from "./composer.entity";
import { Piece } from "../piece/piece.entity";
import { Collection } from "../collection/collection.entity";
import { CreateComposerDto } from "./dto/create-composer.dto";

@Injectable()
export class ComposerService {
  constructor(
    @InjectRepository(Composer)
    private composerRepository: Repository<Composer>,
    @InjectRepository(Piece)
    private pieceRepository: Repository<Piece>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>
  ) {}

  findAll(): Promise<Composer[]> {
    return this.composerRepository.find();
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
