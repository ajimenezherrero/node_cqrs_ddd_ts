import { CommandBus } from '../../../domain/bus/Command/CommandBus';
import { InMemoryMessageBus as MessageBus } from '../MessageBus/InMemoryMessageBus';
import { EventBus } from '../../../domain/bus/EventBus/EventBus';
import { Subscriber } from '../../../domain/bus/EventBus/Subscriber';
import { Command } from '../../../domain/bus/Command/Command';

class InMemoryCommandBus implements CommandBus {
  bus: EventBus;

  constructor() {
    this.bus = new MessageBus();
  }

  addSubscriber(subscriber: Subscriber) {
    this.bus.addSubscriber(subscriber)
  }

  dispatch(command: Command) {
    try {
      this.bus.dispatch(command);
    } catch (error) {
      throw error;
    }
  }
}

export default InMemoryCommandBus;
