import { Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgForOf } from '@angular/common';
import { Manga } from '../../models/manga';
import { switchMap } from 'rxjs';
import { ReadingMangasService } from '../../services/reading-mangas.service';

@Component({
  selector: 'app-manga-list',
  imports: [MatProgressBarModule, NgForOf],
  templateUrl: './manga-list.component.html',
  styleUrl: './manga-list.component.scss'
})
export class MangaListComponent implements OnInit {
  public mangas: Manga[] = [];
  private readonly readingMediasService = inject(ReadingMangasService);

  ngOnInit() {
    this.readingMediasService.getAllReadingMangasByUserId().subscribe((readingMangas) => {
      this.mangas = readingMangas.content.map((readingManga) => readingManga.manga);
    });

    this.readingMediasService.readingMangasRefreshSubject.pipe(switchMap(() => this.readingMediasService.getAllReadingMangasByUserId())).subscribe((readingMangas) => {
      this.mangas = readingMangas.content.map((readingManga) => readingManga.manga);
    });
  }

  trackManga(index: number, manga: Manga) {
    return manga ? manga.id : undefined;
  }
}
