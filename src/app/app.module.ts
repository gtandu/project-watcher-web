import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from '../home/home.module';
import { SearchMangaModule } from '../search-manga/search-manga.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, SearchMangaModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
