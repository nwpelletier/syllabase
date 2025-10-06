import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Collection } from "./collection.entity";
import { Composer } from "../composer/composer.entity";
import { CreateCollectionDto } from "./dto/create-collection.dto";

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepo: Repository<Collection>,
    @InjectRepository(Composer)
    private readonly composerRepo: Repository<Composer>
  ) {}

  findAll(): Promise<Collection[]> {
    return this.collectionRepo.find({
      relations: ["composer"],
    });
  }

  async findOne(id: number): Promise<Collection> {
    const collection = await this.collectionRepo.findOne({
      where: { id },
      relations: ["composer"],
    });
    if (!collection) {
      throw new NotFoundException(
        `Collection with id ${id} not found`
      );
    }
    return collection;
  }

  async create(
    dto: CreateCollectionDto
  ): Promise<Collection> {
    const composer = dto.composerId
      ? await this.composerRepo.findOneBy({
          id: dto.composerId,
        })
      : undefined;

    const collection = this.collectionRepo.create({
      name: dto.name,
      composer: composer ?? undefined,
    });

    return this.collectionRepo.save(collection);
  }
}
