import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class YoutubeInterceptor implements HttpInterceptor {
  public APIUrl = 'https://www.googleapis.com/youtube/v3/';
  public APIKey = 'AIzaSyDIPGYrE4uua9sq4mwmjZZD6SrjU0y1WjA';
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      url: `${this.APIUrl}${request.url}&key=${this.APIKey}`,
    });

    return next.handle(newReq);
  }
}
