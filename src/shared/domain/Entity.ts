import { Uuid } from "./value-objects/Uuid";

export abstract class Entity<T> {
  protected readonly _id: Uuid;
  public readonly props: T;

  constructor (props: T, id?: Uuid) {
    this._id = id ? id : new Uuid();
    this.props = props;
  }
}