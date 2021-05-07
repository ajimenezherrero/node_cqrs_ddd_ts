import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { GetIngredientQuery } from './GetIngredientQuery';
import { CoreIngredientTypes } from '../../../../../types';
import { Ingredient } from '../../domain/Ingredient';
import IngredientFinder from '../../domain/IngredientFinder';

@injectable()
export class GetIngredient implements UseCase<GetIngredientQuery, Ingredient> {
  finder: IngredientFinder;
  constructor(@inject(CoreIngredientTypes.ingredientFinder) finder: IngredientFinder) {
    this.finder = finder;
  }

  execute(request: GetIngredientQuery): Promise<Ingredient> {
    return this.finder.findById(request.id);
  }
}
