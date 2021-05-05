import { EventBus } from '../../../domain/bus/EventBus/EventBus';
import { Subscriber } from '../../../domain/bus/EventBus/Subscriber';
import { Event } from '../../../domain/bus/EventBus/Event';

import MessageBusError from './MessageBusError';

export class InMemoryMessageBus implements EventBus {
  subscribers: Map<string, Subscriber>;

  constructor() {
    this.subscribers = new Map<string, Subscriber>();
  }

  dispatch(event: Event): void {
    const useCase = this.subscribers.get(event.eventName);

    if (useCase) {
      return useCase.handle(event);
    } else {
      throw new MessageBusError(`Subscriber not found: ${event.eventName}`);
    }
  }

  addSubscriber(subscriber: Subscriber): void {
    this.subscribers.set(subscriber.topic, subscriber);
  }

  removeSubscriber(subscriber: Subscriber): void {
    this.subscribers.delete(subscriber.id);
  }

  listSubscribers(): Map<string, Subscriber> {
    return this.subscribers;
  }
}
