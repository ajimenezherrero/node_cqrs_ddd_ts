import { inject } from "inversify";
import { IngredientRepository } from "../../domain/IngredientRepository";
import { Ingredient } from "../../domain/Ingredient";
import { Uuid } from "../../../../../shared/domain/value-objects/Uuid";
import { TYPES } from "../../../../../shared/infrastructure/bootstrap/Types";
import { Postgresql } from "../../../../../shared/infrastructure/persistence/Postgres/Postgresql";
import { Logger } from "../../../../../shared/infrastructure/logger/Logger";


export class IngredientPGRepository implements IngredientRepository {
  logger: Logger
  postgres: Postgresql;

  constructor(@inject(TYPES.Postgres) postgres: Postgresql, @inject(TYPES.Logger) logger: Logger ) {
    this.logger = logger;
    this.logger.info(`${IngredientPGRepository.name} constructor`);

    this.postgres = postgres;
  }
  
  save(ingredient: Ingredient): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(ingredient: Ingredient): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(ingredientId: Uuid): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findById(ingredientId: Uuid): Ingredient {
    throw new Error("Method not implemented.");
  }
  findAll(): Ingredient[] {
    throw new Error("Method not implemented.");
  }
  
}