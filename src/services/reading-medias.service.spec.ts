import { TestBed } from '@angular/core/testing';

import { ReadingMediasService } from './reading-medias.service';

describe('ReadingMediasService', () => {
  let service: ReadingMediasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingMediasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
