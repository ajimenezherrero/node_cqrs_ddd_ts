import { inject, injectable } from 'inversify';

import { UseCase } from '../../../../../shared/domain/UseCase';
import { IngredientRepository } from '../../domain/IngredientRepository';
import { CoreIngredientTypes } from '../../../../../types';
import { Ingredient } from '../../domain/Ingredient';
import IngredientDuplicatedError from '../../domain/IngredientDuplicatedError';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

@injectable()
export class CreateIngredient implements UseCase<Ingredient> {
  repository: IngredientRepository;
  constructor(@inject(CoreIngredientTypes.ingredientRepository) repository: IngredientRepository) {
    this.repository = repository;
  }

  async execute(id: Uuid, name: string, description: string): Promise<Ingredient> {
    if (await this.repository.findByName(name)) {
      throw new IngredientDuplicatedError();
    }
    const ingredient = new Ingredient({ name, description }, id);

    this.repository.save(ingredient);

    return ingredient;
  }
}
