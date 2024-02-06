import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMangaComponent } from './search-manga.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KeycloakService } from 'keycloak-angular';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('SearchMangaComponent', () => {
  let component: SearchMangaComponent;
  let fixture: ComponentFixture<SearchMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KeycloakService],
      declarations: [SearchMangaComponent, MatAutocomplete]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
