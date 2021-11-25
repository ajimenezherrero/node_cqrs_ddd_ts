import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { CoreRecipeTypes } from '../../../../../types';
import { Recipe } from '../../domain/Recipe';
import { RecipeFinder } from '../../domain/RecipeFinder';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

@injectable()
export class GetFullRecipe implements UseCase<Recipe> {
  finder: RecipeFinder;
  constructor(@inject(CoreRecipeTypes.recipeFinder) finder: RecipeFinder) {
    this.finder = finder;
  }

  execute(id: Uuid): Promise<Recipe> {
    return this.finder.findById(id);
  }
}
