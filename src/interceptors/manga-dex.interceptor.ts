import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MangaDexService } from '../services/mangadex/manga-dex.service';

@Injectable()
export class MangaDexInterceptor implements HttpInterceptor {
  constructor(private readonly mangaDexService: MangaDexService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
