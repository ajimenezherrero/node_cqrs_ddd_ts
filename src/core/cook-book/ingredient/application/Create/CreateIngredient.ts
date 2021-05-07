import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { IngredientRepository } from '../../domain/IngredientRepository';
import { CoreIngredientTypes } from '../../../../../types';
import { Ingredient } from '../../domain/Ingredient';
import { CreateIngredientCommand } from './CreateIngredientCommand';
import IngredientDuplicatedError from '../../domain/IngredientDuplicatedError';

@injectable()
export class CreateIngredient implements UseCase<CreateIngredientCommand, Ingredient> {
  repository: IngredientRepository;
  constructor(@inject(CoreIngredientTypes.ingredientRepository) repository: IngredientRepository) {
    this.repository = repository;
  }

  async execute(request: CreateIngredientCommand): Promise<Ingredient> {
    if (await this.repository.findByName(request.body.name)) {
      throw new IngredientDuplicatedError();
    }
    const ingredient = new Ingredient(request.body);

    this.repository.save(ingredient);

    return ingredient;
  }
}
