import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { reducers } from './state';
import { BookEffects } from './effects/book.effects';

import { FindBooksComponent } from './find-books/find-books.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('books', reducers),
        EffectsModule.forFeature([BookEffects]),
        CarouselModule.forRoot(),
    ],
    declarations: [
        FindBooksComponent,
        BookSearchComponent,
        BookListComponent,
        BookDetailsComponent
    ]
})
export class BooksModule {

}