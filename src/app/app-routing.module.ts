import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksCarouselComponent } from './components/books-carousel/books-carousel.component';

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksCarouselComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
