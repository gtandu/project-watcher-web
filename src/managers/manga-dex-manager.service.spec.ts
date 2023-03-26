import { TestBed } from '@angular/core/testing';

import { MangaDexManagerService } from './manga-dex-manager.service';

describe('MangaDexManagerService', () => {
  let service: MangaDexManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangaDexManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
