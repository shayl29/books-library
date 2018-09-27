import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../shared/components';

import { BookSearchComponent } from './book-search/book-search.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookEditorComponent } from './book-editor/book-editor.component';
import { PipesModule } from '../../shared/pipes';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list/book-list.component';
import { FindBooksComponent } from './find-books/find-books.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookModalComponent } from './book-modal/book-modal.component';

const components = [
  BookSearchComponent,
  BookDetailsComponent,
  BookEditorComponent,
  BookListComponent,
  FindBooksComponent,
  BookModalComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsModule,
    PipesModule
  ],
  exports: components,
  declarations: components,
})
export class BooksComponentsModule { }
