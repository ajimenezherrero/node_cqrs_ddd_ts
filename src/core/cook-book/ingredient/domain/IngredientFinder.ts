import { inject, injectable } from "inversify";
import { Uuid } from "../../../../shared/domain/value-objects/Uuid";
import { CoreIngredientTypes } from "../../../../types";
import { Ingredient } from "./Ingredient";
import IngredientNotFoundError from "./IngredientNotFoundError";
import { IngredientRepository } from "./IngredientRepository";

@injectable()
class IngredientFinder {
  repository: IngredientRepository;
  constructor(@inject(CoreIngredientTypes.ingredientRepository) repository: IngredientRepository) {
    this.repository = repository;
  }

  async findById(id: Uuid): Promise<Ingredient> {
    const ingredient: Ingredient|undefined = await this.repository.findById(id);

    this.ensureIngredientExist(ingredient);

    return ingredient as Ingredient;
  }

  ensureIngredientExist(ingredient: Ingredient|undefined): void {
    if (typeof ingredient === 'undefined') {
      throw new IngredientNotFoundError();
    }
  }

}

export default IngredientFinder;
