import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { Manga } from '../../models/manga';
import { MangasService } from '../../services/mangas.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-manga-search-form',
  standalone: true,
  imports: [MatAutocompleteModule, MatFormFieldModule, MatIconModule, MatInputModule, MatOptionModule, ReactiveFormsModule, MatListModule],
  templateUrl: './manga-search-form.component.html',
  styleUrl: './manga-search-form.component.scss'
})
export class MangaSearchFormComponent implements OnInit {
  public searchFormControl = new FormControl('');
  @Output()
  public searchResultMangas: EventEmitter<Manga[]> = new EventEmitter<Manga[]>();
  constructor(private readonly mangasService: MangasService) {}
  ngOnInit() {
    const searchKeyMin = 3;

    const debounceTimeValue = 500;
    this.searchFormControl.valueChanges
      .pipe(
        filter(Boolean),
        filter((searchKey) => searchKey.length >= searchKeyMin),
        debounceTime(debounceTimeValue),
        distinctUntilChanged(),
        switchMap((searchKey) => {
          return this.mangasService.searchMangaByTitle(searchKey);
        })
      )
      .subscribe((searchResult) => {
        this.searchResultMangas.emit(searchResult);
      });
  }

  public displayMangaName(manga: Manga): string {
    return manga?.name ? manga.name : '';
  }
}
