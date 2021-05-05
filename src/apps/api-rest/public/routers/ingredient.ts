import { Router } from "express";
import { inject, injectable } from "inversify";

import Controller from "../../../../shared/domain/Controller";
import { PublicApiTypes } from "../../../../types";

@injectable()
class IngredientRouter {
  router: Router;

  constructor(
    @inject(PublicApiTypes.ingredientController)
    controller: Controller
  ) {
    this.router = Router();

    this.router.get("/:id", controller.show);
  }
}

export default IngredientRouter;
