import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from 'src/app/core/services/search.service';
import { IItem } from '../../models/search-item.model';
import { IResponse } from '../../models/search-response.model';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss'],
})
export class DetailedInfoComponent implements OnInit, OnDestroy {
  item!: IItem;

  itemId!: string;

  response$!: Observable<IResponse>;

  destroyed$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId') as string;
    this.searchService
      .fetchDetailedInfo(this.itemId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((responseData) => {
        [this.item] = responseData.items;
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
