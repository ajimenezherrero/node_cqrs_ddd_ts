import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { QueryBus } from '../../../../shared/domain/bus/Query/QueryBus';
import Controller from '../../../../shared/domain/Controller';
import { BootstrapTypes } from '../../../../types';
import { GetIngredientQuery } from '../../../../core/cook-book/ingredient/application/Read/GetIngredientQuery';
import { Uuid } from '../../../../shared/domain/value-objects/Uuid';
import { Ingredient } from '../../../../core/cook-book/ingredient/domain/Ingredient';
import { CreateIngredientCommand } from '../../../../core/cook-book/ingredient/application/Create/CreateIngredientCommand';
import { CommandBus } from '../../../../shared/domain/bus/Command/CommandBus';

@injectable()
class IngredientController implements Controller {
  queryBus: QueryBus;
  commandBus: CommandBus;

  constructor(
    @inject(BootstrapTypes.QueryBus) queryBus: QueryBus,
    @inject(BootstrapTypes.CommandBus) commandBus: CommandBus,
  ) {
    this.queryBus = queryBus;
    this.commandBus = commandBus;
  }

  show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const query = new GetIngredientQuery(new Uuid(id));

    try {
      const ingredient = (await this.queryBus.ask(query)) as Ingredient;

      res.json(ingredient.responseView());
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const command = new CreateIngredientCommand(req.body);
    try {
      await this.commandBus.dispatch(command);

      res.status(202).end();
    } catch (error) {
      next(error);
    }
  };

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
