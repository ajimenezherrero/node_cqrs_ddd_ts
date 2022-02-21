import { inject, injectable } from 'inversify';

import { BootstrapTypes } from '../../../../../types';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';
import { Logger } from '../../../../../shared/infrastructure/logger/Logger';
import { Postgresql } from '../../../../../shared/infrastructure/persistence/Postgres/Postgresql';

import { RecipeRepository } from '../../domain/RecipeRepository';
import { Recipe } from '../../domain/Recipe';

@injectable()
export class RecipePGRepository implements RecipeRepository {
  logger: Logger;
  postgres: Postgresql;

  constructor(@inject(BootstrapTypes.Postgres) postgres: Postgresql, @inject(BootstrapTypes.Logger) logger: Logger) {
    this.logger = logger;
    this.logger.info(`${RecipePGRepository.name} constructor`);

    this.postgres = postgres;
  }

  async findById(recipeId: Uuid): Promise<Recipe | undefined> {
    const query = `SELECT id, name, description FROM recipe WHERE id = $1`;
    const { rows } = await this.postgres.query(query, [recipeId.toString()]);

    if (rows[0]) {
      return Recipe.fromPrimitives(rows[0]);
    }
  }

  async findAll(): Promise<Recipe[]> {
    const query = `SELECT * FROM recipe`;
    const { rows } = await this.postgres.query(query);

    
    return rows.map(row => Recipe.fromPrimitives(row));
  }
}
