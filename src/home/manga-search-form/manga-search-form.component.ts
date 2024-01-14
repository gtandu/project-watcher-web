import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { NgForOf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { MangaDexManagerService } from '../../managers/manga-dex-manager.service';
import { Manga } from '../../models/manga';

@Component({
  selector: 'app-manga-search-form',
  standalone: true,
  imports: [MatAutocompleteModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, NgForOf, ReactiveFormsModule],
  templateUrl: './manga-search-form.component.html',
  styleUrl: './manga-search-form.component.scss'
})
export class MangaSearchFormComponent implements OnInit {
  public searchFormControl = new FormControl('');
  public searchResultMangas: Manga[] = [];
  @Output()
  public selectedManga: EventEmitter<Manga> = new EventEmitter<Manga>();

  constructor(private readonly mangaDexManagerService: MangaDexManagerService) {}
  ngOnInit() {
    this.searchFormControl.valueChanges
      .pipe(
        switchMap((searchKey) => {
          const searchKeyMin = 3;
          return searchKey && searchKey.length >= searchKeyMin ? this.mangaDexManagerService.searchMangaByTitle(searchKey) : of([]);
        })
      )
      .subscribe((searchResult) => {
        this.searchResultMangas = searchResult;
      });
  }

  public updateSelectedManga(selected: MatAutocompleteSelectedEvent) {
    this.selectedManga.emit(selected.option.value);
  }

  public displayMangaName(manga: Manga): string {
    return manga?.name ? manga.name : '';
  }
}
