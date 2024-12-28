import { Component, OnInit, ViewChild } from '@angular/core';
import { Manga } from '../../models/manga';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { KeycloakService } from 'keycloak-angular';
import { ReadingFormat, ReadingManga } from '../../models/reading-manga';
import { ReadingMangasService } from '../../services/reading-mangas.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public selectedManga: Manga | undefined;
  public searchResultMangas: Manga[] = [];
  public isMobile = false;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  constructor(
    private readonly readingMangasService: ReadingMangasService,
    private readonly responsive: BreakpointObserver,
    private readonly keycloakService: KeycloakService,
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
