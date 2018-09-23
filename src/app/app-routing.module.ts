import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindBooksComponent } from './books/find-books/find-books.component';

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: FindBooksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
