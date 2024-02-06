import { TestBed } from '@angular/core/testing';

import { MangaDexManagerService } from './manga-dex-manager.service';
import { KeycloakService } from 'keycloak-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MangaDexManagerService', () => {
  let service: MangaDexManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: KeycloakService }]
    });
    service = TestBed.inject(MangaDexManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
