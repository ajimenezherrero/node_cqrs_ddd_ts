import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { GetIngredientQuery } from './GetIngredientQuery';
import { IngredientRepository } from '../../domain/IngredientRepository';
import { CoreIngredientTypes } from '../../../../../types';
import { Ingredient } from '../../domain/Ingredient';

@injectable()
export class GetIngredientUseCase implements UseCase<GetIngredientQuery, Ingredient> {
  repository: IngredientRepository;
  constructor(@inject(CoreIngredientTypes.ingredientRepository) repository: IngredientRepository) {
    this.repository = repository;
  }

  execute(request: GetIngredientQuery): Promise<Ingredient> {
    return this.repository.findById(request.id);
  }
}
