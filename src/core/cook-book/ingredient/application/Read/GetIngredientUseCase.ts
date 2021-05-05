import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { GetIngredientQuery } from './GetIngredientQuery';
import { IngredientRepository } from '../../domain/IngredientRepository';
import { CoreIngredientTypes } from '../../../../../types';

@injectable()
export class GetIngredientUseCase implements UseCase<GetIngredientQuery, any> {
  repository: IngredientRepository;
  constructor(@inject(CoreIngredientTypes.ingredientRepository) repository: IngredientRepository) {
    this.repository = repository;
  }

  async execute(request: GetIngredientQuery) {
    const ingredient = await this.repository.findById(request.id);

    return { ...ingredient.responseView() };
  }
}
