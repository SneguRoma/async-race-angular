import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';




@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
  ],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent, HeaderComponent],
})
export class AppModule { }
