import { CustomActions, CreateCustomItem } from '../actions/cutom.action';
import { ICustomItem } from '../models/custom-item.model';

export interface ICustomItemsState {
  items: ICustomItem[];
}

const initialState: ICustomItemsState = {
  items: [],
};

export function CustomItemsReducer(
  state: ICustomItemsState = initialState,
  action: CreateCustomItem
) {
  switch (action.type) {
    case CustomActions.CreateCustomItem:
      console.log(state);
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
}
