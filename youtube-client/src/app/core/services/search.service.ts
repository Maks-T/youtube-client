import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeSort } from 'src/app/shared/models/type-sort.model';
import { IResponse } from 'src/app/youtube/models/search-response.model';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, debounceTime, finalize } from 'rxjs/operators';

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

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(public http: HttpClient) {}

  public fetchVideos(searchValue: string) {
    const url = `search?q=${searchValue}&part=snippet&type=video&maxResults=10`;
    this.isLoading$.next(true);
    return this.http.get<IResponse>(url).pipe(
      map((responseData: IResponse) => {
        const videoIds = responseData.items.map((item) => {
          return item.id.videoId;
        });

        return videoIds;
      }),
      switchMap((videoIds) => {
        const urlVideos = `videos?id=${videoIds}&part=statistics,snippet`;
        return this.http.get<IResponse>(urlVideos);
      }),
      finalize(() => this.isLoading$.next(false))
    );
  }

  public fetchDetailedInfo(videoId: string) {
    const url = `videos?id=${videoId}&part=snippet,statistics`;

    return this.http.get<IResponse>(url);
  }
}
