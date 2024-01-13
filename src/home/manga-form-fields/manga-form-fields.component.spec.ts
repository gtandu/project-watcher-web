import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaFormFieldsComponent } from './manga-form-fields.component';

describe('MangaFormFieldsComponent', () => {
  let component: MangaFormFieldsComponent;
  let fixture: ComponentFixture<MangaFormFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaFormFieldsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MangaFormFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
