import { IItem } from 'src/app/youtube/models/search-item.model';
import { SetYoutubeItems, YoutubeActions } from '../actions/youtube.action';

export interface IYoutubeItemsState {
  items: IItem[];
}

const initialState: IYoutubeItemsState = {
  items: [],
};

export function YoutubeItemsReducer(
  state: IYoutubeItemsState = initialState,
  action: SetYoutubeItems,
) {
  switch (action.type) {
    case YoutubeActions.SetYoutubeItems:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
