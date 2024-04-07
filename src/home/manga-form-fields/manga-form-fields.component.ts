import { Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KeyValuePipe, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { StarRatingModule } from 'angular-star-rating';
import { Manga } from '../../models/manga';
import { MangaDexStatus, MangaDexStatusMessagePipe } from '../../pipes/mangadex/manga-dex-status-message.pipe';

@Component({
  selector: 'app-manga-form-fields',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgIf,
    StarRatingModule,
    NgForOf,
    KeyValuePipe,
    MangaDexStatusMessagePipe,
    NgOptimizedImage
  ],
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

  public mangaDexStatus = MangaDexStatus;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    const selectedMangaChange: SimpleChange = changes['selectedManga'];
    if (selectedMangaChange?.currentValue) {
      this.patchFormValues(selectedMangaChange.currentValue);
    }
  }

  private patchFormValues(selectedManga: Manga) {
    this.getNameFormControl().patchValue(selectedManga?.name ? selectedManga.name : '');
    this.getDescriptionFormControl().patchValue(selectedManga?.description ? selectedManga.description : '');
    this.getStateFormControl().patchValue(selectedManga.state);
    this.getCoverPictureUrlFormControl().patchValue(selectedManga?.coverPictureUrl ? selectedManga.coverPictureUrl : '');
    this.getReadingSourceFormControl().patchValue(selectedManga?.readingSource ? selectedManga.readingSource : '');
    this.getReleasedDateFormControl().patchValue(selectedManga?.releasedDate ? selectedManga.releasedDate : '');
  }

  private getReleasedDateFormControl(): FormControl {
    return this.mangaForm.controls['releasedDate'] as FormControl;
  }

  private getReadingSourceFormControl(): FormControl {
    return this.mangaForm.controls['readingSource'] as FormControl;
  }

  private getCoverPictureUrlFormControl(): FormControl {
    return this.mangaForm.controls['coverPictureUrl'] as FormControl;
  }

  private getStateFormControl(): FormControl {
    return this.mangaForm.controls['state'] as FormControl;
  }

  public getDescriptionFormControl(): FormControl {
    return this.mangaForm.controls['description'] as FormControl;
  }

  private getNameFormControl(): FormControl {
    return this.mangaForm.controls['name'] as FormControl;
  }

  originalOrder = (): number => 0;

  onSubmit() {
    this.filledManga.emit(this.mangaForm.getRawValue());
  }
}
