import { Ingredient } from './RecipeIngredient';
import { Uuid } from '../../../../shared/domain/value-objects/Uuid';

export interface IngredientRepository {
  save(ingredient: Ingredient): void;
  update(ingredient: Ingredient): Promise<void>;
  delete(ingredientId: Uuid): Promise<void>;
  findById(ingredientId: Uuid): Promise<Ingredient | undefined>;
  findByName(name: string): Promise<Ingredient | undefined>;
  findAll(): Ingredient[];
}
