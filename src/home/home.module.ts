import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class HomeModule { }
