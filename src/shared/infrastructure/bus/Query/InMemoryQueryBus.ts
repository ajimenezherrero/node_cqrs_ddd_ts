import { injectable } from 'inversify';

import { EventBus } from '../../../domain/bus/EventBus/EventBus';
import { Subscriber } from '../../../domain/bus/EventBus/Subscriber';
import { Query } from '../../../domain/bus/Query/Query';
import { QueryBus } from '../../../domain/bus/Query/QueryBus';
import { InMemoryMessageBus as MessageBus } from '../MessageBus/InMemoryMessageBus';

@injectable()
export class InMemoryQueryBus implements QueryBus {
  bus: EventBus;

  constructor() {
    this.bus = new MessageBus();
  }

  addSubscriber(subscriber: Subscriber) {
    this.bus.addSubscriber(subscriber);
  }

  async ask(query: Query) {
    return await this.bus.dispatch(query);
  }
}
