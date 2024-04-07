import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from '../models/manga';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangasService {
  private readonly BACKEND_ENDPOINT = `${environment.BACKEND_ENDPOINT_API_V1}/mangas`;
  private readonly DEFAULT_PAGE_SIZE = 10;

  constructor(private readonly http: HttpClient) {}

  public createManga(manga: Manga): Observable<Manga> {
    return this.http.put<Manga>(this.BACKEND_ENDPOINT, manga);
  }

  public deleteById(mangaId: string): Observable<Manga> {
    return this.http.delete<Manga>(`${this.BACKEND_ENDPOINT}/${mangaId}`); //localhost:7001/mangas/test");
  }

  public searchMangaByTitle(title: string): Observable<Manga[]> {
    const options = { params: new HttpParams().set('size', this.DEFAULT_PAGE_SIZE) };
    return this.http.get<Manga[]>(`${this.BACKEND_ENDPOINT}/search/${title}`, options);
  }
}
