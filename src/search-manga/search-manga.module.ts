import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchMangaComponent } from './search-manga/search-manga.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [SearchMangaComponent],
  exports: [SearchMangaComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatAutocompleteModule]
})
export class SearchMangaModule {}
