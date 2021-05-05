import { Uuid } from '../../../../shared/domain/value-objects/Uuid';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';

export interface IngredientProps {
  name: string;
  description: string;
}

export class Ingredient extends AggregateRoot<IngredientProps> {
  constructor(props: IngredientProps, id?: Uuid) {
    super(props, id);
  }

  get id(): Uuid {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  responseView(): unknown {
    return {
      id: this.id,
      name: this.props.name,
      description: this.props.description,
    };
  }
}
