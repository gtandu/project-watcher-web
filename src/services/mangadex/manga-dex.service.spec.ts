import { TestBed } from '@angular/core/testing';

import { MangaDexService } from './manga-dex.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';

describe('MangaDexService', () => {
  let service: MangaDexService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KeycloakService]
    });
    service = TestBed.inject(MangaDexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
