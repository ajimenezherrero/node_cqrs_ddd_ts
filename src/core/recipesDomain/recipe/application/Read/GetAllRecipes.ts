import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { CoreRecipeTypes } from '../../../../../types';
import { Recipe } from '../../domain/Recipe';
import { RecipeFinder } from '../../domain/RecipeFinder';

@injectable()
export class GetAllRecipes implements UseCase<Recipe[]> {
  finder: RecipeFinder;
  constructor(@inject(CoreRecipeTypes.recipeFinder) finder: RecipeFinder) {
    this.finder = finder;
  }

  execute(): Promise<Recipe[]> {
    return this.finder.findAll();
  }
}
