import { NgModule } from '@angular/core';

import { PipesModule } from '../../shared/pipes';
import { CommonModule } from '@angular/common';
import { BooksComponentsModule } from '../components';
import { ComponentsModule } from '../../shared/components';
import { BooksPageComponent } from './books-page/books-page.component';
import { BookModalFactoryComponent } from './book-modal-factory/book-modal-factory.component';

const containers = [
  BookModalFactoryComponent,
  BooksPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    BooksComponentsModule
  ],
  exports: containers,
  declarations: containers,
})
export class BooksContainersModule { }
