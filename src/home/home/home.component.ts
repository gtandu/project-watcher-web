import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Manga } from '../../models/manga';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {
  public mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  public selectedManga: Manga | undefined;

  constructor(
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
  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
