import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReadingMedia } from '../models/reading-media';

@Injectable({
  providedIn: 'root'
})
export class ReadingMediasService {

  private readonly BACKEND_ENDPOINT = `${environment.BACKEND_ENDPOINT_API_V1}/reading-medias`;
  constructor(private readonly http: HttpClient) {}

  public addMediaToReadingList(readingMedia: ReadingMedia): Observable<ReadingMedia> {
    return this.http.put<ReadingMedia>(this.BACKEND_ENDPOINT, readingMedia);
  }
}
