import { Ingredient } from './Ingredient';
import { Uuid } from '../../../../shared/domain/value-objects/Uuid';

export interface IngredientRepository {
  save(ingredient: Ingredient): Promise<void>;
  update(ingredient: Ingredient): Promise<void>;
  delete(ingredientId: Uuid): Promise<void>;
  findById(ingredientId: Uuid): Promise<Ingredient>;
  findAll(): Ingredient[];
}
