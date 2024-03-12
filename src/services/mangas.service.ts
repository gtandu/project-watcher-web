import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from '../models/manga';
import { environment } from '../environments/environment';
import { ReadingManga } from '../models/reading-manga';

@Injectable({
  providedIn: 'root'
})
export class MangasService {
  private readonly BACKEND_ENDPOINT = `${environment.BACKEND_ENDPOINT_API_V1}/mangas`;
  constructor(private readonly http: HttpClient) {}

  public getById(mangaId: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.BACKEND_ENDPOINT}/${mangaId}`); //localhost:7001/mangas/test");
  }

  public getAll(): Observable<Manga[]> {
    return this.http.get<Manga[]>(this.BACKEND_ENDPOINT);
  }

  public addMediaToReadingList(readingMedia: ReadingManga): Observable<ReadingManga> {
    return this.http.post<ReadingManga>(this.BACKEND_ENDPOINT, readingMedia);
  }

  public updateManga(mangaId: string, manga: Manga): Observable<Manga> {
    return this.http.put<Manga>(`${this.BACKEND_ENDPOINT}/${mangaId}`, manga);
  }

  public deleteById(mangaId: string): Observable<Manga> {
    return this.http.delete<Manga>(`${this.BACKEND_ENDPOINT}/${mangaId}`); //localhost:7001/mangas/test");
  }
}
