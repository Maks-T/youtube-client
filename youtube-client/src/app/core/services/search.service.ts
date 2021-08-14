import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TypeSort } from 'src/app/shared/models/type-sort.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  public searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public searchFilterText: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public typeSort: BehaviorSubject<TypeSort> = new BehaviorSubject<TypeSort>(
    TypeSort.empty
  );
}
