import { inject, injectable } from "inversify";
import { IngredientRepository } from "../../domain/IngredientRepository";
import { Ingredient } from "../../domain/Ingredient";
import { Uuid } from "../../../../../shared/domain/value-objects/Uuid";
import { BootstrapTypes } from "../../../../../shared/infrastructure/bootstrap/BootstrapTypes";
import { Postgresql } from "../../../../../shared/infrastructure/persistence/Postgres/Postgresql";
import { Logger } from "../../../../../shared/infrastructure/logger/Logger";

@injectable()
export class IngredientPGRepository implements IngredientRepository {
  logger: Logger;
  postgres: Postgresql;

  constructor(@inject(BootstrapTypes.Postgres) postgres: Postgresql, @inject(BootstrapTypes.Logger) logger: Logger) {
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
  async findById(ingredientId: Uuid): Promise<Ingredient> {
    const query = `SELECT id, name, description FROM ingredient WHERE id = $1`;
    const {
      rows: [{ name, description, id }],
    } = await this.postgres.query(query, [ingredientId.toString()]);

    return new Ingredient({ name, description }, id);
  }
  findAll(): Ingredient[] {
    throw new Error("Method not implemented.");
  }
}
