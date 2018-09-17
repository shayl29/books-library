import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './common/ui.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BooksCarouselComponent } from './components/books-carousel/books-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
