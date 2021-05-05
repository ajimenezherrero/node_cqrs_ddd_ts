import { ContainerModule, interfaces } from 'inversify';

import { BootstrapTypes } from '../../../types';
import { QueryBus } from '../../domain/bus/Query/QueryBus';
import { CommandBus } from '../../domain/bus/Command/CommandBus';
import { InMemoryCommandBus } from '../bus/Command/InMemoryCommandBus';
import { InMemoryQueryBus } from '../bus/Query/InMemoryQueryBus';
import { configuration, Config } from '../configuration/Config';
import { Logger } from '../logger/Logger';
import WinstonLogger from '../logger/WinstonLogger';
import { Postgresql } from '../persistence/Postgres/Postgresql';

export class Bootstrap {
  container: ContainerModule;

  constructor() {
    this.container = new ContainerModule((bind: interfaces.Bind) => {
      bind<Config>(BootstrapTypes.Config).toConstantValue(configuration);
      bind<Logger>(BootstrapTypes.Logger).toDynamicValue(this.initLogger);
      bind<Postgresql>(BootstrapTypes.Postgres).to(Postgresql);
      bind<CommandBus>(BootstrapTypes.CommandBus).to(InMemoryCommandBus).inSingletonScope();
      bind<QueryBus>(BootstrapTypes.QueryBus).to(InMemoryQueryBus).inSingletonScope();
    });
  }

  initLogger(context: interfaces.Context): Logger {
    return new WinstonLogger(context.container.get<Config>(BootstrapTypes.Config).loggerLevel).logger;
  }
}
