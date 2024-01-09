import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MangaDexAuthResponse, MangaDexResponse } from "../../models/mangadex/manga-dex-object";
import { MangaDexInterface } from "./manga-dex-interface";

@Injectable({
  providedIn: 'root'
})
export class MangaDexService implements MangaDexInterface {

  public BASE_URL = 'https://api.mangadex.org';
  public COVER_BASE_URL = 'https://uploads.mangadex.org/covers';
  public LIMIT = 5;

  constructor(private readonly http: HttpClient) { }

  public login(): Observable<MangaDexAuthResponse>{
    const creds = {
      username: 'dylams',
      password: '@!QLbeAz55TH'
    };
    return this.http.post<MangaDexAuthResponse>(`${this.BASE_URL}/auth/login`, creds);
  }

  public refreshToken(refreshToken: string): Observable<MangaDexAuthResponse>{
    return this.http.post<MangaDexAuthResponse>(`${this.BASE_URL}/auth/refresh`, { token: refreshToken });
  }

  public searchMangaByTitle(title: string): Observable<MangaDexResponse> {
    const httpParams = new HttpParams()
      .set("title", title)
      .set("limit", this.LIMIT)
      .set("includes[]", "cover_art");

    return this.http.get<MangaDexResponse>(`${this.BASE_URL}/manga`, {params: httpParams});
  }
}
