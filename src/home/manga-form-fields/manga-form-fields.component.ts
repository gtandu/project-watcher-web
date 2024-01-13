import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-manga-form-fields',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './manga-form-fields.component.html',
  styleUrl: './manga-form-fields.component.scss'
})
export class MangaFormFieldsComponent {
  public mangaForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    state: [''],
    comments: [''],
    source: [''],
    rating: [0],
    cover: ['']
  });

  constructor(private readonly formBuilder: FormBuilder) {}
}
