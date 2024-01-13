import { TestBed } from '@angular/core/testing';

import { MangaDexInterceptor } from './manga-dex.interceptor';

describe('MangaDexInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MangaDexInterceptor]
    })
  );

  it('should be created', () => {
    const interceptor: MangaDexInterceptor = TestBed.inject(MangaDexInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
