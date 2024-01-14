import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { Manga } from '../../models/manga';
import { MediaMatcher } from '@angular/cdk/layout';
import { MangasService } from '../../services/mangas.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  public selectedManga: Manga | undefined;

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  constructor(
    private readonly mangasService: MangasService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 39.9375rem)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
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
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
