import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeSort } from 'src/app/shared/models/type-sort.model';
import { IResponse } from 'src/app/youtube/models/search-response.model';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { IItem } from 'src/app/youtube/models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public searchFilterText$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public typeSort$: BehaviorSubject<TypeSort> = new BehaviorSubject<TypeSort>(
    TypeSort.empty
  );

  constructor(public http: HttpClient) {}

  public fetchVideos(searchValue: string) {
    const url = `https://www.googleapis.com/youtube/v3/search?q=${searchValue}&part=snippet&type=video&maxResults=10&key=AIzaSyDIPGYrE4uua9sq4mwmjZZD6SrjU0y1WjA`;

    return this.http.get<IResponse>(url).pipe(
      map((responseData: IResponse) => {
        const videoIds = responseData.items.map((item) => {
          return item.id.videoId;
        });

        return videoIds;
      }),
      switchMap((videoIds) => {
        const urlVideos = `https://www.googleapis.com/youtube/v3/videos?id=${videoIds}&key=AIzaSyDIPGYrE4uua9sq4mwmjZZD6SrjU0y1WjA&part=statistics,snippet`;
        console.log('videoIds', videoIds);
        return this.http.get<IResponse>(urlVideos);
      })
    );
  }
}
