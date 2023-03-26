import { Component, OnInit } from '@angular/core';
import { Manga } from "../../models/manga";
import { MangasService } from "../../services/mangas.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public mangas: Manga[] = [];

  constructor(private readonly mangasService: MangasService) { }

  ngOnInit(): void {
    this.mangasService.getAll().subscribe((mangas) => {
      this.mangas = mangas;
    })
  }

}
