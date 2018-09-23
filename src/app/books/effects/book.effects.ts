import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { GoogleBooksService } from '../../services/google-books.service';
import {
  BookActionTypes,
  Search,
  SearchComplete,
  SearchError,
} from '../actions/book.actions';
import { Book } from '../../models/book';

@Injectable()
export class BookEffects {
  @Effect()
  search$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<Search>(BookActionTypes.Search),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      switchMap(query => {
        if (query === '') {
          return empty();
        }

        const nextSearch$ = this.actions$.pipe(
          ofType(BookActionTypes.Search),
          skip(1)
        );

        return this.googleBooks.searchBooks(query).pipe(
          takeUntil(nextSearch$),
          map((books: Book[]) => new SearchComplete(books)),
          catchError(err => of(new SearchError(err)))
        );
      })
    );

  constructor(
    private actions$: Actions,
    private googleBooks: GoogleBooksService
  ) {}
}
