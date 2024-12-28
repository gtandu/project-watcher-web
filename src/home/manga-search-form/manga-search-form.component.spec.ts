import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MangaSearchFormComponent } from './manga-search-form.component';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { bleachDigitalComicsManga, bleachManga, bleachOneShotManga } from '../../utils/tests/mock-data';
import { KeycloakService } from 'keycloak-angular';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MangasService } from '../../services/mangas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MangaSearchFormComponent', () => {
  let component: MangaSearchFormComponent;
  let fixture: ComponentFixture<MangaSearchFormComponent>;
  let mangasServiceSpy: Spy<MangasService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        KeycloakService,
        {
          provide: MangasService,
          useValue: createSpyFromClass(MangasService)
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaSearchFormComponent);
    component = fixture.componentInstance;

    mangasServiceSpy = TestBed.inject<any>(MangasService);
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
      component.searchResultMangas.subscribe((result) => {
        expect(result).toEqual([]);
      });
    });

    it('should return list of mangas when user search keys are equals or more than 3 characters', () => {
      // GIVEN
      let expectedMangas = [{ ...bleachManga }, { ...bleachDigitalComicsManga }, { ...bleachOneShotManga }];
      const searchKey = 'Ble';

      mangasServiceSpy.searchMangaByTitle.and.nextWith(expectedMangas);
      component.ngOnInit();

      // WHEN
      component.searchFormControl.patchValue(searchKey);

      // THEN
      component.searchResultMangas.subscribe((result) => {
        expect(result).toEqual(expectedMangas);
        expect(mangasServiceSpy.searchMangaByTitle).toHaveBeenCalledWith(searchKey);
      });
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