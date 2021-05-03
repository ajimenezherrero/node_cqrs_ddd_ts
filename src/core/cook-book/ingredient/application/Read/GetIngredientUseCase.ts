import { UseCase } from '../../../../../shared/domain/UseCase';
import { GetIngredientQuery } from './GetIngredientQuery';

export class GetIngredientUseCase implements UseCase<GetIngredientQuery, any> {

  execute(request: GetIngredientQuery) {

    return {}
  }
}