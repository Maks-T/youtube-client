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
    public store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    const regUrlImage =
      '^https?://(?:[a-z0-9-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:jpg|gif|png)$';
    const regUrlVideo =
      '^https?://(?:[a-z0-9-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:mov|avi|wmv|flv|3gp|mp4|mpg)$';

    this.cardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageLink: ['', [Validators.required, Validators.pattern(regUrlImage)]],
      videoLink: ['', [Validators.required, Validators.pattern(regUrlVideo)]],
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

  getTitleErrorMessage(): string {
    const title = this.cardForm.controls.title;
    if (title.hasError('required')) {
      return 'You must enter a Title';
    }
    return title.hasError('minlength')
      ? 'Title must contain more than 2 characters'
      : '';
  }

  getDescriptionErrorMessage(): string {
    const description = this.cardForm.controls.description;
    if (description.hasError('required')) {
      return 'You must enter a Description';
    }
    return description.hasError('minlength')
      ? 'Description must contain more than 10 characters'
      : '';
  }

  getImageLinkErrorMessage(): string {
    const url = this.cardForm.controls.imageLink;
    if (url.hasError('required')) {
      return 'You must enter a URL';
    }
    return url.hasError('pattern')
      ? 'Enter the correct URL Image jpg|gif|png'
      : '';
  }

  getVideoLinkErrorMessage(): string {
    const url = this.cardForm.controls.videoLink;
    if (url.hasError('required')) {
      return 'You must enter a URL';
    }
    return url.hasError('pattern')
      ? 'Enter the correct URL Video mov|avi|wmv|flv|3gp|mp4|mpg'
      : '';
  }
}
