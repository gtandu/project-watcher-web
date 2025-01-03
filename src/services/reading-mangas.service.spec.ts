import { TestBed } from '@angular/core/testing';

import { ReadingMangasService } from './reading-mangas.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ReadingMangasService', () => {
  let service: ReadingMangasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    });
    service = TestBed.inject(ReadingMangasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
