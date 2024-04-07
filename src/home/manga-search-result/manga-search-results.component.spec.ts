import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaSearchResultsComponent } from './manga-search-results.component';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { bleachManga } from '../../utils/tests/mock-data';

describe('MangaSearchResultsComponent', () => {
  let component: MangaSearchResultsComponent;
  let fixture: ComponentFixture<MangaSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatListModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateSelectedManga', () => {
    it('should emit selected manga when method is called', () => {
      // GIVEN
      const matSelectionListChange: MatSelectionListChange = {
        options: [{ value: bleachManga }]
      } as MatSelectionListChange;
      spyOn(component.selectedManga, 'emit');

      // WHEN
      component.updateSelectedManga(matSelectionListChange);

      // THEN
      expect(component.selectedManga.emit).toHaveBeenCalledWith(bleachManga);
    });
  });
});
