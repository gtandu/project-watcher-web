import { TestBed } from '@angular/core/testing';

import { ReadingMangasService } from './reading-mangas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReadingMangasService', () => {
  let service: ReadingMangasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ReadingMangasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
