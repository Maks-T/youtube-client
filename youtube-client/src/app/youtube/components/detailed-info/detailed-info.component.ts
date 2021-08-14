import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mockResponse } from 'src/app/app.constants';
import { IItem } from '../../models/search-item.model';

@Component({
  selector: 'app-detailed-info',
  templateUrl: './detailed-info.component.html',
  styleUrls: ['./detailed-info.component.scss'],
})
export class DetailedInfoComponent implements OnInit {
  item!: IItem;
  itemId!: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('itemId') as string;
    this.item =
      mockResponse.items.find((item) => item.id === this.itemId) ||
      mockResponse.items[0];
  }

  public onGoBack() {
    this.router.navigate(['search']);
  }
}
