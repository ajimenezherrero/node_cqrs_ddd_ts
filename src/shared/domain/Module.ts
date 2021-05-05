import { QueryBus } from './bus/Query/QueryBus';
import { QueryHandler } from './bus/Query/QueryHandler';

export interface Module {
  queryBus: QueryBus;
  queryHandlers: QueryHandler[];

  init(): void;
}
