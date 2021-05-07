import { inject, injectable } from 'inversify';
import { IngredientRepository } from '../../domain/IngredientRepository';
import { Ingredient } from '../../domain/Ingredient';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';
import { BootstrapTypes } from '../../../../../types';
import { Postgresql } from '../../../../../shared/infrastructure/persistence/Postgres/Postgresql';
import { Logger } from '../../../../../shared/infrastructure/logger/Logger';

@injectable()
export class IngredientPGRepository implements IngredientRepository {
  logger: Logger;
  postgres: Postgresql;

  constructor(@inject(BootstrapTypes.Postgres) postgres: Postgresql, @inject(BootstrapTypes.Logger) logger: Logger) {
    this.logger = logger;
    this.logger.info(`${IngredientPGRepository.name} constructor`);

    this.postgres = postgres;
  }

  save(ingredient: Ingredient): void {
    const query = `INSERT INTO ingredient (id, name, description) VALUES($1, $2, $3)`;
    const values = [ingredient.id.toString(), ingredient.name, ingredient.description];
    this.postgres.query(query, values);
  }

  update(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findById(ingredientId: Uuid): Promise<Ingredient | undefined> {
    const query = `SELECT id, name, description FROM ingredient WHERE id = $1`;
    const { rows } = await this.postgres.query(query, [ingredientId.toString()]);

    if (rows[0]) {
      return new Ingredient(rows[0], ingredientId);
    }
  }

  async findByName(name: string): Promise<Ingredient | undefined> {
    const query = `SELECT id, name, description FROM ingredient WHERE name = $1`;
    const { rows } = await this.postgres.query(query, [name]);

    if (rows[0]) {
      return new Ingredient(rows[0], rows[0].id);
    }
  }

  findAll(): Ingredient[] {
    throw new Error('Method not implemented.');
  }
}
