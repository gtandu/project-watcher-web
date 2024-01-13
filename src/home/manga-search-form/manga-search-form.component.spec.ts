import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaSearchFormComponent } from './manga-search-form.component';
import { MangaDexManagerService } from '../../managers/manga-dex-manager.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { EventEmitter } from '@angular/core';
import { Manga } from '../../models/manga';
import { bleachDigitalComicsManga, bleachManga, bleachOneShotManga } from '../../utils/tests/mock-data';

describe('MangaSearchFormComponent', () => {
  let component: MangaSearchFormComponent;
  let fixture: ComponentFixture<MangaSearchFormComponent>;
  let mangaDexManagerServiceSpy: Spy<MangaDexManagerService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaSearchFormComponent],
      providers: [{ provide: MangaDexManagerService, useValue: createSpyFromClass(MangaDexManagerService) }]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaSearchFormComponent);
    component = fixture.componentInstance;

    mangaDexManagerServiceSpy = TestBed.inject<any>(MangaDexManagerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should return empty list when user search keys are less than 3 characters', () => {
      // GIVEN
      component.ngOnInit();

      // WHEN
      component.searchFormControl.patchValue('Bl');

      // THEN
      expect(component.searchResultMangas).toEqual([]);
    });

    it('should return empty list when user search keys are equals or more than 3 characters', () => {
      // GIVEN
      let expectedMangas = [{ ...bleachManga }, { ...bleachDigitalComicsManga }, { ...bleachOneShotManga }];
      const searchKey = 'Ble';

      mangaDexManagerServiceSpy.searchMangaByTitle.and.nextWith(expectedMangas);
      component.ngOnInit();

      // WHEN
      component.searchFormControl.patchValue(searchKey);

      // THEN
      expect(component.searchResultMangas).toEqual(expectedMangas);
      expect(mangaDexManagerServiceSpy.searchMangaByTitle).toHaveBeenCalledWith(searchKey);
    });
  });

  describe('updateSelectedManga', () => {
    it('should emit selected manga when user select manga in autocomplete list', () => {
      // GIVEN
      const event: MatAutocompleteSelectedEvent = {
        option: {
          value: { ...bleachManga }
        }
      } as MatAutocompleteSelectedEvent;

      component.selectedManga = createSpyFromClass(EventEmitter<Manga>);

      // WHEN
      component.updateSelectedManga(event);

      // THEN
      expect(component.selectedManga.emit).toHaveBeenCalledWith(event.option.value);
    });
  });

  describe('displayMangaName', () => {
    it('should display manga name when field name of manga is filled', () => {
      // GIVEN
      const expectedMangaName = 'Test';
      const manga = { ...bleachManga, name: expectedMangaName };

      // WHEN

      let mangaName = component.displayMangaName(manga);

      // THEN
      expect(mangaName).toBe(expectedMangaName);
    });
  });
});
