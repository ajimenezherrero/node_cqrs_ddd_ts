import { Query } from '../../../../../shared/domain/bus/Query/Query';
import { Uuid } from '../../../../../shared/domain/value-objects/Uuid';

export interface GetIngredientQuery extends Query {
  id: Uuid,
}