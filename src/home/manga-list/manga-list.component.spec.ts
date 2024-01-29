import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaListComponent } from './manga-list.component';
import { MangasService } from '../../services/mangas.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Manga } from '../../models/manga';
import { bleachDigitalComicsManga, bleachManga, bleachOneShotManga } from '../../utils/tests/mock-data';

describe('MangaListComponent', () => {
  let component: MangaListComponent;
  let fixture: ComponentFixture<MangaListComponent>;
  let mangasServiceSpy: Spy<MangasService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaListComponent],
      providers: [
        {
          provide: MangasService,
          useValue: createSpyFromClass(MangasService, {
            observablePropsToSpyOn: ['mangaRefreshSubject']
          })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaListComponent);
    component = fixture.componentInstance;

    mangasServiceSpy = TestBed.inject<any>(MangasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load mangas list', () => {
      // GIVEN
      const expectedMangas: Manga[] = [{ ...bleachManga }, { ...bleachOneShotManga }];
      mangasServiceSpy.getAll.and.nextWith(expectedMangas);

      // WHEN
      component.ngOnInit();

      // THEN
      expect(mangasServiceSpy.getAll).toHaveBeenCalled();
      expect(component.mangas).toBe(expectedMangas);
    });

    it('should load mangas list when refresh is trigger', () => {
      // GIVEN
      const expectedMangas: Manga[] = [{ ...bleachManga }, { ...bleachOneShotManga }, { ...bleachDigitalComicsManga }];
      mangasServiceSpy.getAll.and.nextWith(expectedMangas);
      mangasServiceSpy.mangaRefreshSubject.nextWith();

      // WHEN
      component.ngOnInit();

      // THEN
      expect(mangasServiceSpy.getAll).toHaveBeenCalledTimes(2);
      expect(component.mangas).toBe(expectedMangas);
    });
  });
});
