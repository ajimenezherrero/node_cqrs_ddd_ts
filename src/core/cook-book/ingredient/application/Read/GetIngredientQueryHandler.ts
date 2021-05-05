import { inject, injectable } from 'inversify';

import { QueryHandler } from '../../../../../shared/domain/bus/Query/QueryHandler';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';
import { GetIngredientQuery } from './GetIngredientQuery';

import { CoreIngredientTypes } from '../../../../../types';
import { UseCase } from '../../../../../shared/domain/UseCase';
import { Query } from '../../../../../shared/domain/bus/Query/Query';
import { Ingredient } from '../../domain/Ingredient';

@injectable()
export class GetIngredientQueryHandler implements QueryHandler {
  id: string;
  topic = 'GetIngredientQuery';
  private useCase: UseCase<Query, Ingredient>;

  constructor(@inject(CoreIngredientTypes.getIngredientUseCase) useCase: UseCase<Query, Ingredient>) {
    this.useCase = useCase;
    this.id = new Uuid().toString();
  }

  handle(query: GetIngredientQuery): Promise<Ingredient> {
    return this.useCase.execute(query) as Promise<Ingredient>;
  }
}

export default GetIngredientQueryHandler;
