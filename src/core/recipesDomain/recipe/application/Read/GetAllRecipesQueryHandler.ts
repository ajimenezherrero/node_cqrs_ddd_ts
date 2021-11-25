import { inject, injectable } from 'inversify';

import { CoreRecipeTypes } from '../../../../../types';
import { QueryHandler } from '../../../../../shared/domain/bus/Query/QueryHandler';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';
import { UseCase } from '../../../../../shared/domain/UseCase';

import { Recipe } from '../../domain/Recipe';
import { RecipeResponse } from '../../domain/RecipeResponse';

@injectable()
export class GetAllRecipesQueryHandler implements QueryHandler {
  id: string;
  topic = 'GetRecipeQuery';
  private useCase: UseCase<Recipe[]>;

  constructor(@inject(CoreRecipeTypes.getAllRecipesUseCase) useCase: UseCase<Recipe[]>) {
    this.useCase = useCase;
    this.id = new Uuid().toString();
  }

  async handle(): Promise<RecipeResponse[]> {
    const recipes = await this.useCase.execute();

    return recipes.map(recipe => recipe.responseView());
  }
}

