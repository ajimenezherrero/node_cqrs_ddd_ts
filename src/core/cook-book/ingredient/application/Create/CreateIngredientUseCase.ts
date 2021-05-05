import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { IngredientRepository } from '../../domain/IngredientRepository';
import { CoreIngredientTypes } from '../../../../../types';
import { Ingredient } from '../../domain/Ingredient';
import { CreateIngredientCommand } from './CreateIngredientCommand';

@injectable()
export class CreateIngredientUseCase implements UseCase<CreateIngredientCommand, Ingredient> {
  repository: IngredientRepository;
  constructor(@inject(CoreIngredientTypes.ingredientRepository) repository: IngredientRepository) {
    this.repository = repository;
  }

  execute(request: CreateIngredientCommand): Ingredient {
    const ingredient = new Ingredient(request.body);

    this.repository.save(ingredient);

    return ingredient;
  }
}
