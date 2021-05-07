import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { CoreIngredientTypes } from '../../../../../types';
import { Ingredient } from '../../domain/Ingredient';
import IngredientFinder from '../../domain/IngredientFinder';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

@injectable()
export class GetIngredient implements UseCase<Uuid, Ingredient> {
  finder: IngredientFinder;
  constructor(@inject(CoreIngredientTypes.ingredientFinder) finder: IngredientFinder) {
    this.finder = finder;
  }

  execute(id: Uuid): Promise<Ingredient> {
    return this.finder.findById(id);
  }
}
