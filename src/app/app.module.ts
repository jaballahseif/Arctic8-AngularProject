import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './core/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [//la liste des composants associés à ce module
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule, //*ngFor + *ngIf
    CommonModule, 
    AppRoutingModule,
    FormsModule //utiliser la directive ngModel
  ],
  providers: [provideHttpClient()
    ,provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule { }
