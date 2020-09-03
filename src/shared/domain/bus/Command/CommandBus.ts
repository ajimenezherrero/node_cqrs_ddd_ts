import { Command } from './Command';
import { EventBus } from '../EventBus/EventBus';

export interface CommandBus {
  bus: EventBus;
  dispatch(command: Command): void;
}
