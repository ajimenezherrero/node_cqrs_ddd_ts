import { inject, injectable } from "inversify";

import { QueryHandler } from "../../../../../shared/domain/bus/Query/QueryHandler";
import { Uuid } from "../../../../../shared/domain/value-objects/Uuid";
import { GetIngredientQuery } from "./GetIngredientQuery";

import { CoreIngredientTypes } from "../../../../../types";
import { UseCase } from "../../../../../shared/domain/UseCase";
import { Query } from "../../../../../shared/domain/bus/Query/Query";

@injectable()
export class GetIngredientQueryHandler implements QueryHandler {
  id: string;
  topic = "GetIngredientQuery";
  private useCase: UseCase<Query, any>;

  constructor(@inject(CoreIngredientTypes.getIngredientUseCase) useCase: UseCase<Query, any>) {
    this.useCase = useCase;
    this.id = new Uuid().toString();
  }

  async handle(query: GetIngredientQuery) {
    return this.useCase.execute(query);
  }
}

export default GetIngredientQueryHandler;
