import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { Manga } from '../../models/manga';
import { MangaDexStatus } from '../../models/mangadex/manga-dex-object';

@Component({
  selector: 'app-manga-form-fields',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, ReactiveFormsModule, NgIf, StarRatingModule, NgForOf],
  templateUrl: './manga-form-fields.component.html',
  styleUrl: './manga-form-fields.component.scss'
})
export class MangaFormFieldsComponent implements OnChanges {
  @Input()
  public selectedManga: Manga | undefined;
  @Output()
  public filledManga: EventEmitter<Manga> = new EventEmitter<Manga>();
  public mangaForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: [''],
    state: [''],
    comments: [''],
    readingSource: [''],
    rate: [0],
    coverPictureUrl: [''],
    releasedDate: ['']
  });

  public status: string[] = Object.values(MangaDexStatus);

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedManga']?.currentValue) {
      const selectedManga: Manga = changes['selectedManga'].currentValue;
      console.log(selectedManga);
      this.mangaForm.controls['name'].patchValue(selectedManga?.name ? selectedManga.name : '');
      this.mangaForm.controls['description'].patchValue(selectedManga?.description ? selectedManga.description : '');
      this.mangaForm.controls['state'].patchValue(selectedManga.state);
      this.mangaForm.controls['coverPictureUrl'].patchValue(selectedManga?.coverPictureUrl ? selectedManga.coverPictureUrl : '');
      this.mangaForm.controls['readingSource'].patchValue(selectedManga?.readingSource ? selectedManga.readingSource : '');
      this.mangaForm.controls['releasedDate'].patchValue(selectedManga?.releasedDate ? selectedManga.releasedDate : '');
    }
  }

  onSubmit() {
    this.filledManga.emit(this.mangaForm.getRawValue());
  }
}
