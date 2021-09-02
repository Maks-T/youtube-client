import { Action } from '@ngrx/store';
import { IItem } from 'src/app/youtube/models/search-item.model';

export enum YoutubeActions {
  SetYoutubeItems = '[Youtube Items] SetYoutubeItems',
}

export class SetYoutubeItems implements Action {
  readonly type = YoutubeActions.SetYoutubeItems;

  constructor(public payload: IItem[]) {}
}
