import { Uuid } from '../../../../shared/domain/value-objects/Uuid';
import IngredientResponse from './IngredientResponse';

export interface IngredientProps {
  name: string;
  description: string;
}

export class Ingredient {
  constructor(props: IngredientProps, id?: Uuid) {
    console.log('🚀 ~ Ingredient ~ constructor ~ id:', id)
    console.log('🚀 ~ Ingredient ~ constructor ~ props:', props)
    
  }

  get id(): Uuid {
    return new Uuid();
  }

  get name(): string {
    return ''; // this.props.name;
  }

  get description(): string {
    return ''; //this.props.description;
  }

  responseView(): IngredientResponse {
    return {
      id: this.id.toString(),
      name: '', //this.props.name,
      description: '', //this.props.description,
    };
  }
}
