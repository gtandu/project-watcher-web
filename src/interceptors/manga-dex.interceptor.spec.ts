import { TestBed } from '@angular/core/testing';

import { MangaDexInterceptor } from './manga-dex.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';

describe('MangaDexInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MangaDexInterceptor, KeycloakService]
    })
  );

  it('should be created', () => {
    const interceptor: MangaDexInterceptor = TestBed.inject(MangaDexInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
