import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { MangaDexManagerService } from '../../managers/manga-dex-manager.service';
import { Manga } from '../../models/manga';

@Component({
  selector: 'app-search-manga',
  templateUrl: './search-manga.component.html',
  styleUrls: ['./search-manga.component.css']
})
export class SearchMangaComponent implements OnInit {
  public mangaSuggested: Manga[] = [];
  searchFieldFormControl = new FormControl('');
  constructor(private readonly mangaDexManagerService: MangaDexManagerService) {}

  ngOnInit(): void {
    this.searchFieldFormControl.valueChanges
      .pipe(
        switchMap((title) => {
          if (title && title.length > 2) {
            return this.mangaDexManagerService.searchMangaByTitle(title);
          }
          return of([]);
        })
      )
      .subscribe((mangas) => {
        console.log(mangas);
        this.mangaSuggested = mangas;
      });
  }

  displayFn(manga: Manga): string {
    return manga?.name ? manga.name : '';
  }
}
