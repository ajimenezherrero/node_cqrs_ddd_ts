import { Query } from './Query';
import { Subscriber } from '../EventBus/Subscriber';

export interface QueryBus {
  ask(Query: Query): unknown;
  addSubscriber(subscriber: Subscriber): void;
}
