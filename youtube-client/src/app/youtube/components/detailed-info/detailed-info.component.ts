import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/core/services/search.service';
import { IAppState } from 'src/app/redux';
import { getAllItems } from 'src/app/redux/selectors/items.selector';
import { ICustomItem } from '../../models/custom-item.model';
import { IItem } from '../../models/search-item.model';
import { IResponse } from '../../models/search-response.model';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss'],
})
export class DetailedInfoComponent implements OnInit, OnDestroy {
  item?: (IItem | ICustomItem) | undefined;

  itemId!: string;

  response$!: Observable<IResponse>;

  destroyed$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public searchService: SearchService,
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId') as string;

    this.store
      .pipe(takeUntil(this.destroyed$), select(getAllItems))
      .subscribe((items) => {
        this.item = items.find((item) => item.id === this.itemId);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public onGoBack() {
    this.router.navigate(['search']);
  }
}
