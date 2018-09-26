import { NgModule } from '@angular/core';

import { PipesModule } from '../../shared/pipes';
import { CommonModule } from '@angular/common';
import { BooksComponentsModule } from '../components';
import { ComponentsModule } from '../../shared/components';
import { BooksComponent } from './books/books.component';

const containers = [
  BooksComponent
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
