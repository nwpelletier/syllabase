import { Repository, ObjectLiteral } from "typeorm";

export async function applyFilters<T extends ObjectLiteral>(
  repository: Repository<T>,
  filters: Record<string, string>,
  allowedKeys: string[],
  joins: { relation: string; alias: string }[] = []
): Promise<T[]> {
  const qb = repository.createQueryBuilder("entity");

  joins.forEach((j) =>
    qb.leftJoinAndSelect(`entity.${j.relation}`, j.alias)
  );

  for (const key of allowedKeys) {
    if (filters[key]) {
      qb.andWhere(`entity.${key} = :${key}`, {
        [key]: filters[key],
      });
    }
  }

  return qb.getMany();
}
