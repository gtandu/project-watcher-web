import { TestBed } from '@angular/core/testing';

import { MangaDexService } from './manga-dex.service';

describe('MangaDexService', () => {
  let service: MangaDexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangaDexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
