import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaFormFieldsComponent } from './manga-form-fields.component';
import { bleachManga } from '../../utils/tests/mock-data';
import { StarRatingConfigService } from 'angular-star-rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventEmitter, SimpleChange } from '@angular/core';
import { createSpyFromClass } from 'jasmine-auto-spies';

describe('MangaFormFieldsComponent', () => {
  let component: MangaFormFieldsComponent;
  let fixture: ComponentFixture<MangaFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaFormFieldsComponent, BrowserAnimationsModule],
      providers: [{ provide: StarRatingConfigService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should patch form values when selectedManga input changes', () => {
      // GIVEN
      const expectedMangaFormValue = {
        name: bleachManga.name,
        description: bleachManga.description,
        state: bleachManga.state,
        comments: '',
        readingSource: bleachManga.readingSource,
        rate: bleachManga.rate,
        coverPictureUrl: bleachManga.coverPictureUrl,
        releasedDate: bleachManga.releasedDate
      };
      component.selectedManga = bleachManga;

      // WHEN
      component.ngOnChanges({
        selectedManga: new SimpleChange(null, component.selectedManga, true)
      })

      // THEN
      expect(component.mangaForm.getRawValue()).toEqual(expectedMangaFormValue);
    });
  });

  describe('onSubmit', () => {
    it('should emit form values when method is called', () => {
      // GIVEN
      component.selectedManga = bleachManga;
      component.filledManga = createSpyFromClass<any>(EventEmitter);
      component.ngOnChanges({
        selectedManga: new SimpleChange(null, component.selectedManga, true)
      })
      // WHEN
      component.onSubmit();

      // THEN
      expect(component.filledManga.emit).toHaveBeenCalledWith(component.mangaForm.getRawValue());
    })
  })
});
