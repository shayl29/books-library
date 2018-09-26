import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModalModule } from 'ngx-bootstrap/modal';

import { reducers } from './state';
import { BookEffects } from './effects/book.effects';
import { PipesModule } from '../shared/pipes';

import { FindBooksComponent } from './find-books/find-books.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { ComponentsModule } from '../shared/components';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        ReactiveFormsModule,
        StoreModule.forFeature('books', reducers),
        EffectsModule.forFeature([BookEffects]),
        ModalModule.forRoot(),
        ComponentsModule,
        ToastrModule.forRoot()
    ],
    declarations: [
        FindBooksComponent,
        BookSearchComponent,
        BookListComponent,
        BookDetailsComponent,
        BookEditorComponent
    ]
})
export class BooksModule {

}
