import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/redux';
import { CreateCustomItem } from 'src/app/redux/actions/cutom.action';
import { v4 as uuidv4 } from 'uuid';
import { ICustomItem } from '../../models/custom-item.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public cardForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.cardForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageLink: ['', [Validators.required]],
      videoLink: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    const payload: ICustomItem = {
      id: uuidv4(),
      snippet: {
        title: this.cardForm.controls.title.value,
        description: this.cardForm.controls.description.value,
        videoSource: this.cardForm.controls.videoLink.value,
        publishedAt: new Date().toDateString(),
        thumbnails: {
          high: {
            url: this.cardForm.controls.imageLink.value,
          },
          medium: {
            url: this.cardForm.controls.imageLink.value,
          },
          default: {
            url: this.cardForm.controls.imageLink.value,
          },
        },
      },
      statistics: {
        likeCount: '0',
        dislikeCount: '0',
        viewCount: '0',
        commentCount: '0',
        favoriteCount: '0',
      },
    };

    this.store.dispatch(new CreateCustomItem(payload));

    this.router.navigate(['search']);
  }
}
