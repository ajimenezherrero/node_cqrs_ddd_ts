import { inject, injectable } from 'inversify';

import { QueryHandler } from '../../../../../shared/domain/bus/Query/QueryHandler';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';
import { GetIngredientQuery } from './GetRecipeIngredientQuery';

import { CoreIngredientTypes } from '../../../../../types';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { Ingredient } from '../../domain/RecipeIngredient';
import IngredientResponse from '../../domain/RecipeIngredientResponse';

@injectable()
export class GetIngredientQueryHandler implements QueryHandler {
  id: string;
  topic = 'GetIngredientQuery';
  private useCase: UseCase<Ingredient>;

  constructor(@inject(CoreIngredientTypes.getIngredientUseCase) useCase: UseCase<Ingredient>) {
    this.useCase = useCase;
    this.id = new Uuid().toString();
  }

  async handle(query: GetIngredientQuery): Promise<IngredientResponse> {
    const ingredient = await this.useCase.execute(query.id);

    return ingredient.responseView();
  }
}

export default GetIngredientQueryHandler;
