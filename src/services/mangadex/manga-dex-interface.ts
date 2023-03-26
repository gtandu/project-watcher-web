import { Observable } from "rxjs";
import { Manga } from "../../models/manga";
import { MangaDexAuthResponse, MangaDexResponse } from "../../models/mangadex/manga-dex-object";

export interface MangaDexInterface {
  login(): Observable<MangaDexAuthResponse>;
  refreshToken(refreshToken: string): Observable<MangaDexAuthResponse>;
  searchMangaByTitle(title: string): Observable<MangaDexResponse | Manga[]>;
}
