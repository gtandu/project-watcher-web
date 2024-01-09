import {Component, OnInit} from '@angular/core';
import {Manga} from "../../models/manga";
import {MangasService} from "../../services/mangas.service";
import {FormControl} from "@angular/forms";
import {of, switchMap} from "rxjs";
import {MangaDexManagerService} from "../../managers/manga-dex-manager.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public mangas: Manga[] = [];
  public searchFormControl = new FormControl('');
  public searchResultMangas: Manga[] = [];
  public selectedManga: Manga | undefined;

  constructor(private readonly mangasService: MangasService, private readonly mangaDexManagerService: MangaDexManagerService) { }

  ngOnInit(): void {
    this.mangasService.getAll().subscribe((mangas) => {
      this.mangas = mangas;
    })

    this.searchFormControl.valueChanges.pipe(
        switchMap((searchKey) => {
          return searchKey && searchKey.length >= 3 ? this.mangaDexManagerService.searchMangaByTitle(searchKey) : of([]);
        })
    ).subscribe((searchResult) => {
      this.searchResultMangas = searchResult;
    });
  }

  public updateSelectedManga(selected: MatAutocompleteSelectedEvent){
    this.selectedManga = selected.option.value;
  }

  public displayMangaName(manga: Manga): string {
    return manga?.name ? manga.name : '';
  }

}
