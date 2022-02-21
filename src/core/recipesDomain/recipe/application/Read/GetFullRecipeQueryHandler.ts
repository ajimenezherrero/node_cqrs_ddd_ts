import { inject, injectable } from 'inversify';

import { QueryHandler } from '../../../../../shared/domain/bus/Query/QueryHandler';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';
import { GetFullRecipeQuery } from './GetFullRecipeQuery';

import { CoreRecipeTypes } from '../../../../../types';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { Recipe } from '../../domain/Recipe';
import { RecipeResponse } from '../../domain/RecipeResponse';

@injectable()
export class GetFullRecipeQueryHandler implements QueryHandler {
  id: string;
  topic = 'GetFullRecipeQuery';
  private useCase: UseCase<Recipe>;

  constructor(@inject(CoreRecipeTypes.getFullRecipeUseCase) useCase: UseCase<Recipe>) {
    this.useCase = useCase;
    this.id = new Uuid().toString();
  }

  async handle(query: GetFullRecipeQuery): Promise<RecipeResponse> {
    const Recipe = await this.useCase.execute(query.id);

    return Recipe.responseView();
  }
}
