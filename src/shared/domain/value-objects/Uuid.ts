import { v4 as uuidv4, validate } from 'uuid';

export class Uuid {
  readonly value: string;

  constructor(value?: string) {
    this.value = value ? value : uuidv4();
  }

  static generate(): Uuid {
    return new Uuid(uuidv4());
  }

  isValidUuid(uuid: string) {
    if (!validate(uuid)) {
      throw new Error('Invalid uuid');
    }
  }

  toString(): string {
    return this.value;
  }
}
