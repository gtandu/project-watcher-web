import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReadingManga } from '../models/reading-manga';
import { PageableResultSearch } from '../models/pageable-result-search';

@Injectable({
  providedIn: 'root'
})
export class ReadingMangasService {
  public readingMangasRefreshSubject = new Subject<void>();
  private readonly BACKEND_ENDPOINT = `${environment.BACKEND_ENDPOINT_API_V1}/reading-mangas`;

  constructor(private readonly http: HttpClient) {}

  public getAllReadingMangasByUserId(): Observable<PageableResultSearch<ReadingManga>> {
    return this.http.get<PageableResultSearch<ReadingManga>>(this.BACKEND_ENDPOINT);
  }

  public addMediaToReadingList(readingMedia: ReadingManga): Observable<ReadingManga> {
    return this.http.put<ReadingManga>(this.BACKEND_ENDPOINT, readingMedia);
  }
}
