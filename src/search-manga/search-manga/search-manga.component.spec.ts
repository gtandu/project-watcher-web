import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMangaComponent } from './search-manga.component';

describe('SearchMangaComponent', () => {
  let component: SearchMangaComponent;
  let fixture: ComponentFixture<SearchMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMangaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
