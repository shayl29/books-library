import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take, first } from 'rxjs/operators';
import * as BookActions from '../actions/book.actions';
import * as fromBooks from '../state'
import { Book } from '../../models/book';


@Component({
  selector: 'app-find-books',
  templateUrl: './find-books.component.html',
  styleUrls: ['./find-books.component.scss']
})
export class FindBooksComponent implements OnInit {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  selectedBooks: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromBooks.State>) {
    this.searchQuery$ = store.pipe(
      select(fromBooks.getSearchQuery),
      take(1)
    );

    this.books$ = store.pipe(select(fromBooks.getSearchResults));
    this.selectedBooks = this.books$.pipe(
      select(f => f.slice(0, 5)));

    this.loading$ = store.pipe(select(fromBooks.getSearchLoading));
    this.error$ = store.pipe(select(fromBooks.getSearchError));
  }

  ngOnInit() {
  }

  search(query: string) {
    this.store.dispatch(new BookActions.Search(query));
  }
}
