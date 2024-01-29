import { Component, OnInit, ViewChild } from '@angular/core';
import { Manga } from '../../models/manga';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MangasService } from '../../services/mangas.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public selectedManga: Manga | undefined;
  public isMobile = false;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  constructor(
    private readonly mangasService: MangasService,
    private readonly responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape]).subscribe((result) => {
      this.isMobile = result.matches;
    });
  }

  public onSelectedManga(selectedManga: Manga) {
    this.selectedManga = selectedManga;
  }

  public saveManga(filledManga: Manga) {
    this.mangasService.createManga(filledManga).subscribe(() => {
      this.mangasService.mangaRefreshSubject.next();
      this.sidenav?.close();
      this.selectedManga = undefined;
    });
  }
}
