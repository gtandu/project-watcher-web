import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Manga } from '../models/manga';

@Injectable({
  providedIn: 'root'
})
export class MangasService {
  private readonly BACKEND_ENDPOINT = 'http://localhost:7001/mangas';
  public mangaRefreshSubject = new Subject<void>();
  constructor(private readonly http: HttpClient) {}

  public getById(mangaId: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.BACKEND_ENDPOINT}/${mangaId}`); //localhost:7001/mangas/test");
  }

  public getAll(): Observable<Manga[]> {
    return this.http.get<Manga[]>(this.BACKEND_ENDPOINT);
  }

  public createManga(manga: Manga): Observable<Manga> {
    return this.http.post<Manga>(this.BACKEND_ENDPOINT, manga);
  }

  public updateManga(mangaId: string, manga: Manga): Observable<Manga> {
    return this.http.put<Manga>(`${this.BACKEND_ENDPOINT}/${mangaId}`, manga);
  }

  public deleteById(mangaId: string): Observable<Manga> {
    return this.http.delete<Manga>(`${this.BACKEND_ENDPOINT}/${mangaId}`); //localhost:7001/mangas/test");
  }
}
