import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Manga } from '../../models/manga';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { ReadingFormat, ReadingManga } from '../../models/reading-manga';
import { ReadingMangasService } from '../../services/reading-mangas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Keycloak from 'keycloak-js';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { MangaSearchFormComponent } from '../manga-search-form/manga-search-form.component';
import { MangaSearchResultsComponent } from '../manga-search-result/manga-search-results.component';
import { MangaFormFieldsComponent } from '../manga-form-fields/manga-form-fields.component';
import { MangaListComponent } from '../manga-list/manga-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatButton,
    MatIcon,
    MatSidenavModule,
    NgClass,
    MangaSearchFormComponent,
    MangaSearchResultsComponent,
    MangaFormFieldsComponent,
    MangaListComponent,
    MatIconButton,
    MatMenuItem,
    NgIf
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  public selectedManga: Manga | undefined;
  public searchResultMangas: Manga[] = [];
  public isMobile = false;
  private readonly keycloakService = inject(Keycloak);

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  constructor(
    private readonly readingMangasService: ReadingMangasService,
    private readonly responsive: BreakpointObserver,
    private readonly matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  public onSelectedManga(selectedManga: Manga) {
    this.selectedManga = selectedManga;
  }

  public onSearchResultMangas(searchResultMangas: Manga[]) {
    this.searchResultMangas = searchResultMangas;
  }

  public saveManga(filledManga: Manga) {
    const readingManga: ReadingManga = {
      id: filledManga.id,
      manga: filledManga,
      readingFormat: ReadingFormat.VOLUME,
      readingFormatStatusList: []
    };
    this.readingMangasService.addMediaToReadingList(readingManga).subscribe(() => {
      this.readingMangasService.readingMangasRefreshSubject.next();
      this.onClosedSidenav();
      this.matSnackBar.open('Manga added', 'Close', { duration: 2000 });
    });
  }

  public onClosedSidenav() {
    this.sidenav?.close();
    this.selectedManga = undefined;
    this.searchResultMangas = [];
  }
  public logout() {
    this.keycloakService.logout();
  }
}
