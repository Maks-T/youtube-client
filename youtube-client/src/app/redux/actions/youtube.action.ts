import { Action } from '@ngrx/store';
import { IItem } from 'src/app/youtube/models/search-item.model';

export enum YoutubeActions {
  SetYoutubeItems = '[Youtube Items] SetYoutubeItems',
  GetYoutubeItems = '[Youtube Items] GetYoutubeItems',
}

export class GetYoutubeItems implements Action {
  readonly type = YoutubeActions.GetYoutubeItems;

  constructor(public payload: IItem[]) {}
}

export class SetYoutubeItems implements Action {
  readonly type = YoutubeActions.SetYoutubeItems;

  constructor(public payload: IItem[]) {}
}

export type YoutubeItemsUnion = GetYoutubeItems | SetYoutubeItems;
