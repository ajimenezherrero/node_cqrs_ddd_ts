import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import Controller from '../../../../shared/domain/Controller';
import { QueryBus } from '../../../../shared/domain/bus/Query/QueryBus';
import { Uuid } from '../../../../shared/domain/value-objects/Uuid';

import { BootstrapTypes } from '../../../../types';

import { GetAllRecipesQuery } from '../../../../core/recipesDomain/recipe/application/Read/GetAllRecipesQuery';
import { GetFullRecipeQuery } from '../../../../core/recipesDomain/recipe/application/Read/GetFullRecipeQuery';
import { RecipeResponse } from '../../../../core/recipesDomain/recipe/domain/RecipeResponse';

@injectable()
export class RecipeController implements Controller {
  queryBus: QueryBus;

  constructor(
    @inject(BootstrapTypes.QueryBus) queryBus: QueryBus,
  ) {
    this.queryBus = queryBus;
  }

  show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const query = new GetFullRecipeQuery(new Uuid(id));

    try {
      console.log("🚀 ~ file: recipe.ts ~ line 30 ~ RecipeController ~ show= ~ this.queryBus", this.queryBus)
      const RecipeResponse = (await this.queryBus.ask(query)) as RecipeResponse;

      res.json(RecipeResponse);
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const query = new GetAllRecipesQuery();

    try {
      const AllRecipesResponse = (await this.queryBus.ask(query)) as RecipeResponse[];

      res.json(AllRecipesResponse);
    } catch (error) {
      next(error);
    }
  }
  
  create = async (): Promise<void> => {
    throw new Error('Method not implemented.');
  };

  update(): void {
    throw new Error('Method not implemented.');
  }

  delete(): void {
    throw new Error('Method not implemented.');
  }
}

export default RecipeController;
