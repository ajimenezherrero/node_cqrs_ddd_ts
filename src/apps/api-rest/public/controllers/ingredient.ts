import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";

import { QueryBus } from "../../../../shared/domain/bus/Query/QueryBus";
import Controller from "../../../../shared/domain/Controller";
import { BootstrapTypes } from "../../../../types";
import { GetIngredientQuery } from "../../../../core/cook-book/ingredient/application/Read/GetIngredientQuery";
import { Uuid } from "../../../../shared/domain/value-objects/Uuid";

@injectable()
class IngredientController implements Controller {
  queryBus: QueryBus;
  constructor(@inject(BootstrapTypes.QueryBus) queryBus: QueryBus) {
    this.queryBus = queryBus;
  }

  show = async (req: Request, res: Response, _: NextFunction) => {
    const { id } = req.params;
    const query = new GetIngredientQuery(new Uuid(id));

    const response = await this.queryBus.ask(query);

    res.json(response);
  };

  create() {
    throw new Error("Method not implemented.");
  }

  list() {
    throw new Error("Method not implemented.");
  }

  update() {
    throw new Error("Method not implemented.");
  }

  delete() {
    throw new Error("Method not implemented.");
  }
}

export default IngredientController;
