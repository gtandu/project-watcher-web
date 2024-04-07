import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MangasService } from './mangas.service';
import { Manga } from '../models/manga';
import { environment } from '../environments/environment';

describe('MangasService', () => {
  let service: MangasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MangasService]
    });
    service = TestBed.inject(MangasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a manga', () => {
    const dummyManga: Manga = new Manga(1, 'Test Manga', 'Description', 2023, 'cover.jpg', 5, 'Review', 'State', 'Source');

    service.createManga(dummyManga).subscribe((manga) => {
      expect(manga).toEqual(dummyManga);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_ENDPOINT_API_V1}/mangas`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyManga);
  });

  it('should delete a manga by id', () => {
    const mangaId = '1';

    service.deleteById(mangaId).subscribe((manga) => {
      expect(manga).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.BACKEND_ENDPOINT_API_V1}/mangas/${mangaId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should search mangas by title with pagination', () => {
    const dummyMangas: Manga[] = [
      {
        id: 1,
        name: 'Test Manga',
        description: '',
        releasedDate: 2023,
        coverPictureUrl: '',
        rate: 0,
        review: '',
        state: '',
        readingSource: ''
      }
    ];
    const title = 'Test';
    const size = 10;

    service.searchMangaByTitle(title).subscribe((mangas) => {
      expect(mangas.length).toBe(1);
      expect(mangas).toEqual(dummyMangas);
    });

    const req = httpMock.expectOne(`${environment.BACKEND_ENDPOINT_API_V1}/mangas/search/${title}?size=${size}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMangas);
  });
});
