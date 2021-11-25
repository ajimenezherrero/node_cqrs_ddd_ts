import { Uuid } from '../../../../shared/domain/value-objects/Uuid';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';

import { RecipeResponse } from './RecipeResponse';

export interface RecipeProps {
  name: string;
  description: string;
  duration: string;
  difficulty: string; //TODO Enum
  categories: string[]; //TODO Category[]
  creatorId: Uuid;
}

export class Recipe extends AggregateRoot<RecipeProps> {
  constructor(props: RecipeProps, id?: Uuid) {
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

  get duration(): string {
    return this.props.description;
  }

  get difficulty(): string {
    return this.props.description;
  }

  get categories(): string {
    return this.props.description;
  }

  get creatorId(): string {
    return this.props.description;
  }

  responseView(): RecipeResponse {
    return {
      id: this.id.toString(),
      name: this.props.name,
      description: this.props.description,
      duration: this.props.duration,
      difficulty: this.props.difficulty,
      categories: this.props.categories,
      creatorId: this.creatorId.toString(),
    };
  }
}
