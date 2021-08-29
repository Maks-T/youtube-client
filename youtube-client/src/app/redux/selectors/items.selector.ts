import { createSelector } from '@ngrx/store';
import { IAppState } from '..';
import { ICustomItemsState } from '../reducers/custom.reducer';
import { IYoutubeItemsState } from '../reducers/youtube.reducer';

const selectYoutubeItems = (state: IAppState) => state.youtubeItems;

const selectCustomItems = (state: IAppState) => state.customItems;

export const getAllItems = createSelector(
  selectCustomItems,
  selectYoutubeItems,
  (stateCustom: ICustomItemsState, stateYoutube: IYoutubeItemsState) => [
    ...stateCustom.items,
    ...stateYoutube.items,
  ],
);
