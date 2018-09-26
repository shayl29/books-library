import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state';
import { BookEffects } from './effects/book.effects';
import { PipesModule } from '../shared/pipes';

import { ComponentsModule } from '../shared/components';
import { BooksComponentsModule } from './components';
import { BooksContainersModule } from './containers';

@NgModule({
    imports: [
        CommonModule,
        PipesModule,
        StoreModule.forFeature('books', reducers),
        EffectsModule.forFeature([BookEffects]),
        ModalModule.forRoot(),
        ComponentsModule,
        ToastrModule.forRoot(),
        BooksComponentsModule,
        BooksContainersModule
    ],
    declarations: []
})
export class BooksModule {

}
