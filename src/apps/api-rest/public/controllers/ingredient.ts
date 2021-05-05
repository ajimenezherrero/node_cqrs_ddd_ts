import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';

import { QueryBus } from '../../../../shared/domain/bus/Query/QueryBus';
import Controller from '../../../../shared/domain/Controller';
import { BootstrapTypes } from '../../../../types';
import { GetIngredientQuery } from '../../../../core/cook-book/ingredient/application/Read/GetIngredientQuery';
import { Uuid } from '../../../../shared/domain/value-objects/Uuid';
import { Ingredient } from '../../../../core/cook-book/ingredient/domain/Ingredient';

@injectable()
class IngredientController implements Controller {
  queryBus: QueryBus;
  constructor(@inject(BootstrapTypes.QueryBus) queryBus: QueryBus) {
    this.queryBus = queryBus;
  }

  show = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const query = new GetIngredientQuery(new Uuid(id));

    const ingredient = (await this.queryBus.ask(query)) as Ingredient;

    res.json(ingredient.responseView());
  };

  create(): void {
    throw new Error('Method not implemented.');
  }

  list(): void {
    throw new Error('Method not implemented.');
  }

  update(): void {
    throw new Error('Method not implemented.');
  }

  delete(): void {
    throw new Error('Method not implemented.');
  }
}

export default IngredientController;
