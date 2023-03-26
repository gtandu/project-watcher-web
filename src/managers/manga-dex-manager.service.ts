import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Manga } from "../models/manga";
import { MangaDexAuthResponse, MangaDexResponse } from "../models/mangadex/manga-dex-object";
import { MangaDexInterface } from "../services/mangadex/manga-dex-interface";
import { MangaDexService } from "../services/mangadex/manga-dex.service";

@Injectable({
  providedIn: 'root'
})
export class MangaDexManagerService implements MangaDexInterface {

  public COVER_BASE_URL = 'https://uploads.mangadex.org/covers';

  constructor(private readonly mangaDexService: MangaDexService) { }

  public login(): Observable<MangaDexAuthResponse> {
    return this.mangaDexService.login();
  }

  public refreshToken(refreshToken: string): Observable<MangaDexAuthResponse> {
    return this.mangaDexService.refreshToken(refreshToken);
  }

  public searchMangaByTitle(title: string): Observable<Manga[]> {
    return this.mangaDexService.searchMangaByTitle(title).pipe(
      map((mangaDexResponse: MangaDexResponse) => {
        return mangaDexResponse.data.map((mangaResponse) => {
          const mangaDexObjectRelationshipsData = mangaResponse.relationships.find(value => value.type === 'cover_art');
          return new Manga("",
            mangaResponse.attributes.title.en,
            mangaResponse.attributes.description.en,
            mangaResponse.attributes.year,
            mangaDexObjectRelationshipsData ? `${this.COVER_BASE_URL}/${mangaResponse.id}/${mangaDexObjectRelationshipsData.attributes.fileName}` : "",
            0,
            "",
            mangaResponse.attributes.status,
            "")
        })
      })
    );
  }
}
