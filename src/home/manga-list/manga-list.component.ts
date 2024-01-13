import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgForOf } from '@angular/common';
import { MangasService } from '../../services/mangas.service';
import { Manga } from '../../models/manga';

@Component({
  selector: 'app-manga-list',
  standalone: true,
  imports: [MatProgressBarModule, NgForOf],
  templateUrl: './manga-list.component.html',
  styleUrl: './manga-list.component.scss'
})
export class MangaListComponent implements OnInit {
  public mangas: Manga[] = [];

  constructor(private readonly mangasService: MangasService) {}

  ngOnInit() {
    this.mangasService.getAll().subscribe((mangas) => {
      this.mangas = mangas;
    });
  }
}
