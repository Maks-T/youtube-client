import { Action } from '@ngrx/store';
import { ICustomItem } from '../models/custom-item.model';

export enum CustomActions {
  CreateCustomItem = '[Custom Items] CreateCustomItem',
}

export class CreateCustomItem implements Action {
  readonly type = CustomActions.CreateCustomItem;

  constructor(public payload: ICustomItem) {}
}
