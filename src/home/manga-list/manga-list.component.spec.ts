import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaListComponent } from './manga-list.component';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { bleachDigitalComicsReadingManga, bleachOneShotReadingManga, bleachReadingManga } from '../../utils/tests/mock-data';
import { ReadingMangasService } from '../../services/reading-mangas.service';
import { ReadingManga } from '../../models/reading-manga';

describe('MangaListComponent', () => {
  let component: MangaListComponent;
  let fixture: ComponentFixture<MangaListComponent>;
  let readingMangasServiceSpy: Spy<ReadingMangasService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaListComponent],
      providers: [
        {
          provide: ReadingMangasService,
          useValue: createSpyFromClass(ReadingMangasService, {
            observablePropsToSpyOn: ['readingMangasRefreshSubject']
          })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaListComponent);
    component = fixture.componentInstance;

    readingMangasServiceSpy = TestBed.inject<any>(ReadingMangasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load mangas list', () => {
      // GIVEN
      const expectedReadingMangas: ReadingManga[] = [{ ...bleachReadingManga }, { ...bleachOneShotReadingManga }];
      const expectedMangas = expectedReadingMangas.map((readingMangas) => readingMangas.manga);

      readingMangasServiceSpy.getAllReadingMangasByUserId.and.nextWith(expectedReadingMangas);

      // WHEN
      component.ngOnInit();

      // THEN
      expect(readingMangasServiceSpy.getAllReadingMangasByUserId).toHaveBeenCalled();
      expect(component.mangas).toEqual(expectedMangas);
    });

    it('should load mangas list when refresh is trigger', () => {
      // GIVEN
      const expectedReadingMangas: ReadingManga[] = [{ ...bleachReadingManga }, { ...bleachOneShotReadingManga }, { ...bleachDigitalComicsReadingManga }];
      const expectedMangas = expectedReadingMangas.map((readingMangas) => readingMangas.manga);

      readingMangasServiceSpy.getAllReadingMangasByUserId.and.nextWith(expectedReadingMangas);
      readingMangasServiceSpy.readingMangasRefreshSubject.nextWith();

      // WHEN
      component.ngOnInit();

      // THEN
      expect(readingMangasServiceSpy.getAllReadingMangasByUserId).toHaveBeenCalledTimes(2);
      expect(component.mangas).toEqual(expectedMangas);
    });
  });
});
