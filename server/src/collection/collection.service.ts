import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Collection } from "./collection.entity";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { applyFilters } from "../common/generic-filter";

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>
  ) {}

  findAll(): Promise<Collection[]> {
    return this.collectionRepository.find({
      relations: ["composer"],
    });
  }

  async findOne(id: number): Promise<Collection> {
    const collection =
      await this.collectionRepository.findOne({
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

  async filter(
    query: Record<string, string>
  ): Promise<Collection[]> {
    return applyFilters(
      this.collectionRepository,
      query,
      ["composerId"],
      [{ relation: "composer", alias: "composer" }],
      {
        composerId: "composer.id",
      }
    );
  }

  async create(
    dto: CreateCollectionDto
  ): Promise<Collection> {
    const collection = this.collectionRepository.create({
      name: dto.name,
      composer: dto.composerId
        ? { id: dto.composerId }
        : undefined,
    });

    return this.collectionRepository.save(collection);
  }
}
