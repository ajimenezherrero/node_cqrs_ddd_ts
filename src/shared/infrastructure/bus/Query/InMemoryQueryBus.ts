import { injectable } from 'inversify';
import { QueryBus } from '../../../domain/bus/Query/QueryBus';
import { Query } from '../../../domain/bus/Query/Query';
import { InMemoryMessageBus as MessageBus } from '../MessageBus/InMemoryMessageBus';
import { EventBus } from '../../../domain/bus/EventBus/EventBus';
import { Subscriber } from '../../../domain/bus/EventBus/Subscriber';

@injectable()
export class InMemoryQueryBus implements QueryBus {
  bus: EventBus;

  constructor() {
    this.bus = new MessageBus();
  }

  addSubscriber(subscriber: Subscriber) {
    this.bus.addSubscriber(subscriber)
  }

  async ask(query: Query) {
    try {
      const response = await this.bus.dispatch(query);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
