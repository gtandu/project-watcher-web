import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { Manga } from '../../models/manga';

@Component({
  selector: 'app-manga-search-results',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './manga-search-results.component.html',
  styleUrl: './manga-search-results.component.scss'
})
export class MangaSearchResultsComponent {
  @Input()
  public searchResultMangas: Manga[] = [];
  @Output()
  public selectedManga: EventEmitter<Manga> = new EventEmitter<Manga>();

  public updateSelectedManga(matSelectionListChange: MatSelectionListChange) {
    this.selectedManga.emit(matSelectionListChange.options[0].value);
  }
}
