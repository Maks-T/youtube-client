import { ActionReducerMap } from '@ngrx/store';
import * as CustomItems from './reducers/custom.reducer';
import * as YoutubeItems from './reducers/youtube.reducer';

export interface IAppState {
  customItems: CustomItems.ICustomItemsState;
  youtubeItems: YoutubeItems.IYoutubeItemsState;
}

export const reducers: ActionReducerMap<IAppState, any> = {
  customItems: CustomItems.CustomItemsReducer,
  youtubeItems: YoutubeItems.YoutubeItemsReducer,
};
