import { Container } from 'inversify';
import { Config } from '../configuration/Config';
import { Logger } from '../logger/Logger';
import { TYPES } from './Types';
import { Postgresql } from '../persistence/Postgres/Postgresql';
import { InMemoryCommandBus } from '../bus/Command/InMemoryCommandBus';
import { InMemoryQueryBus } from '../bus/Query/InMemoryQueryBus';

import { GetIngredientQueryHandler } from '../../../core/cook-book/ingredient/application/Read/GetIngredientQueryHandler';
import { GetIngredientUseCase } from '../../../core/cook-book/ingredient/application/Read/GetIngredientUseCase';
export class Bootstrap {
  container: Container;
  public queryBus: InMemoryQueryBus;

  constructor() {
    this.container = new Container();
    this.queryBus = new InMemoryQueryBus();
    this.container.bind<Config>(TYPES.Config).to(Config);
    this.container.bind<Logger>(TYPES.Logger).to(Logger);
    this.container.bind<Postgresql>(TYPES.Postgres).to(Postgresql);
    this.container.bind<InMemoryCommandBus>(TYPES.InMemoryCommandBus).to(InMemoryCommandBus);

    this.initBuses();
  }

  initBuses() {
    this.queryBus.addSubscriber(new GetIngredientQueryHandler(new GetIngredientUseCase()))
  }  
}
