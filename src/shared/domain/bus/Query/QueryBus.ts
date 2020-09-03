import { Query } from './Query';
import { EventBus } from '../EventBus/EventBus';

export interface QueryBus {
  bus: EventBus;
  ask(Query: Query): Promise<any>;
}
