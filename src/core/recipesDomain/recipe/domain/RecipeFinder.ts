import { inject, injectable } from "inversify";
import { Uuid } from "../../../../shared/domain/value-objects/Uuid";
import { CoreRecipeTypes } from "../../../../types";
import { Recipe } from "./Recipe";
import { RecipeNotFoundError } from "./RecipeNotFoundError";
import { RecipeRepository } from "./RecipeRepository";

@injectable()
export class RecipeFinder {
  repository: RecipeRepository;
  constructor(@inject(CoreRecipeTypes.recipeRepository) repository: RecipeRepository) {
    this.repository = repository;
  }

  async findById(id: Uuid): Promise<Recipe> {
    const Recipe: Recipe|undefined = await this.repository.findById(id);

    this.ensureRecipeExist(Recipe);

    return Recipe as Recipe;
  }

  async findAll(): Promise<Recipe[]> {
    const recipes: Recipe[] = await this.repository.findAll();

    return recipes as Recipe[];
  }

  ensureRecipeExist(Recipe: Recipe|undefined): void {
    if (typeof Recipe === 'undefined') {
      throw new RecipeNotFoundError();
    }
  }

}
