import { TestBed } from '@angular/core/testing';

import { MangasService } from './mangas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';

describe('MangasService', () => {
  let service: MangasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KeycloakService]
    });
    service = TestBed.inject(MangasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
