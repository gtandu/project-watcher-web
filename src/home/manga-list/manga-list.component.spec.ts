import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaListComponent } from './manga-list.component';
import { MangasService } from '../../services/mangas.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Manga } from '../../models/manga';
import { bleachManga, bleachOneShotManga } from '../../utils/tests/mock-data';

describe('MangaListComponent', () => {
  let component: MangaListComponent;
  let fixture: ComponentFixture<MangaListComponent>;
  let mangaServiceSpy: Spy<MangasService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaListComponent],
      providers: [{ provide: MangasService, useValue: createSpyFromClass(MangasService) }]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaListComponent);
    component = fixture.componentInstance;

    mangaServiceSpy = TestBed.inject<any>(MangasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load mangas list', () => {
      // GIVEN
      const expectedMangas: Manga[] = [{ ...bleachManga }, { ...bleachOneShotManga }];
      mangaServiceSpy.getAll.and.nextWith(expectedMangas);

      // WHEN
      component.ngOnInit();

      // THEN
      expect(mangaServiceSpy.getAll).toHaveBeenCalled();
      expect(component.mangas).toBe(expectedMangas);
    });
  });
});
