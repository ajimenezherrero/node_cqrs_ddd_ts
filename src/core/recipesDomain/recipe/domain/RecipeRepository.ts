import { Recipe } from './Recipe';
import { Uuid } from '../../../../shared/domain/value-objects/Uuid';

export interface RecipeRepository {
  findById(recipeId: Uuid): Promise<Recipe | undefined>;
  findAll(): Promise<Recipe[]>;
}
