import { IItem } from 'src/app/youtube/models/search-item.model';
import { YoutubeActions, YoutubeItemsUnion } from '../actions/youtube.action';

export interface IYoutubeItemsState {
  items: IItem[];
}

const initialState: IYoutubeItemsState = {
  items: [],
};

export function YoutubeItemsReducer(
  state: IYoutubeItemsState = initialState,
  action: YoutubeItemsUnion
) {
  switch (action.type) {
    case YoutubeActions.SetYoutubeItems:
      console.log(state);
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
