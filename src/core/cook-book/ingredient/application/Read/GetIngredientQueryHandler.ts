import { QueryHandler } from '../../../../../shared/domain/bus/Query/QueryHandler';
import { GetIngredientQuery } from './GetIngredientQuery';
import { GetIngredientUseCase } from './GetIngredientUseCase';

export class GetIngredientQueryHandler implements QueryHandler {
  id = '';
  topic = '';
  private useCase: GetIngredientUseCase;

  constructor (useCase: GetIngredientUseCase) {
    this.useCase = useCase;
  }

  async handle(query: GetIngredientQuery) {
    return await this.useCase.execute(query);
  } 
}

export default GetIngredientQueryHandler;