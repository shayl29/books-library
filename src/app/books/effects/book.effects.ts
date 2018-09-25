import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
  withLatestFrom} from 'rxjs/operators';

import { GoogleBooksService } from '../../services/google-books.service';
import {
  BookActionTypes,
  Search,
  SearchComplete,
  SearchError,
  AddBook,
  AddBookSuccess,
  RemoveBook,
  RemoveBookSuccess,
  EditBook,
  EditBookSuccess} from '../actions/book.actions';
import { Book } from '../../models/book';
import * as fromBook from '../state';

@Injectable()
export class BookEffects {
  @Effect()
  addBook$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<AddBook>(BookActionTypes.AddBook),
      debounceTime(debounce, scheduler),
      map(action => new AddBookSuccess(action.payload))
    );

  @Effect()
  editBook$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<EditBook>(BookActionTypes.EditBook),
      debounceTime(debounce, scheduler),
      map(action => action.payload),
      withLatestFrom(this.store$, (payload, state) => ({ book: payload, state })),
      map(({book, state}) => {
        const srcBook: Book = state.books.books.entities[book.id];
        const updatedBook: Book = {
          ...srcBook,
          id: book.id,
          volumeInfo: {
            ...srcBook.volumeInfo,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            publishedDate: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description
          }
        };
        return new EditBookSuccess(updatedBook);
      })
    );

  @Effect()
  removeBook$ = ({ debounce = 300, scheduler = asyncScheduler} = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<RemoveBook>(BookActionTypes.RemoveBook),
      debounceTime(debounce, scheduler),
      map(action => new RemoveBookSuccess(action.payload))
    );

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
    private store$: Store<fromBook.State>,
    private googleBooks: GoogleBooksService
  ) {}
}
