import { Uuid } from '../../../../shared/domain/value-objects/Uuid';
import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';

import { RecipeResponse } from './RecipeResponse';

export class Recipe extends AggregateRoot {
  readonly id: Uuid;
  readonly name: string;
  readonly description: string;
  readonly duration: string;
  readonly difficulty: string;
  readonly categories: string[];
  readonly creatorId: Uuid;
  
  constructor(id: Uuid, name: string, description: string, duration: string, difficulty: string, categories: string[], creatorId: Uuid) {
    super();

    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.difficulty = difficulty;
    this.categories = categories;
    this.creatorId = creatorId;
  }

  static fromPrimitives(plainData: { id: string, name: string, description: string, duration: string, difficulty: string, categories: string[], creatorId: string }): Recipe {
    return new Recipe(
      new Uuid(plainData.id),
      plainData.name,
      plainData.description,
      plainData.duration,
      plainData.difficulty,
      plainData.categories,
      new Uuid(plainData.creatorId)
    );
  }

  responseView(): RecipeResponse {
    console.log("🚀 ~ file: Recipe.ts ~ line 52 ~ Recipe ~ responseView ~ this", this)
    
    return {
      id: this.id.toString(),
      name: this.name,
      description: this.description,
      duration: this.duration,
      difficulty: this.difficulty,
      categories: this.categories,
      creatorId: this.creatorId.toString(),
    };
  }
}
