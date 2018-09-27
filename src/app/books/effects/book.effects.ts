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
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class BookEffects {
  @Effect()
  addBook$ = ({ debounce = 300, scheduler = asyncScheduler } = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<AddBook>(BookActionTypes.AddBook),
      debounceTime(debounce, scheduler),
      map(action => {
        this.toastr.success('Book added succesfully', 'Add Book');
        return new AddBookSuccess(action.payload);
      })
    )

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
        if (!srcBook) {
          const newBook: Book = {
            id: book.changes.id,
            volumeInfo: book.changes.volumeInfo
          };

          this.toastr.success('Book added succesfully', 'Add Book');
          return new AddBookSuccess(newBook);
        }

        const updatedBook: Book = {
          ...srcBook,
          id: book.changes.id,
          volumeInfo: {
            ...srcBook.volumeInfo,
            authors: book.changes.volumeInfo.authors,
            title: book.changes.volumeInfo.title,
            publishedDate: book.changes.volumeInfo.publishedDate,
            description: book.changes.volumeInfo.description,
            imageLinks: {
              ...srcBook.volumeInfo.imageLinks,
              smallThumbnail: book.changes.volumeInfo.imageLinks.smallThumbnail
            }
          }
        };

        const nothingChanged = JSON.stringify(srcBook).toLowerCase() === JSON.stringify(updatedBook).toLowerCase();

        if (nothingChanged) {
          this.toastr.warning('Nothing to update', 'Edit Book');
        } else {
          this.toastr.success('Book updated succesfully', 'Edit Book');
        }

        return new EditBookSuccess({id: srcBook.id, changes: updatedBook});
      })
    )

  @Effect()
  removeBook$ = ({ debounce = 300, scheduler = asyncScheduler} = {}): Observable<
    Action
  > =>
    this.actions$.pipe(
      ofType<RemoveBook>(BookActionTypes.RemoveBook),
      debounceTime(debounce, scheduler),
      map(action => {
        this.toastr.success('Book removed succesfully', 'Remove Book');
        return new RemoveBookSuccess(action.payload);
      })
    )

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
          map((books: Book[]) => {
            this.router.navigate([], {
              queryParams: { query: query },
              queryParamsHandling: 'merge',
            });

            return new SearchComplete(books);
          }),
          catchError(err => of(new SearchError(err)))
        );
      })
    )

  constructor(
    private actions$: Actions,
    private store$: Store<fromBook.State>,
    private googleBooks: GoogleBooksService,
    private toastr: ToastrService,
    private router: Router
  ) {
    toastr.toastrConfig.positionClass = 'toast-bottom-right';
    toastr.toastrConfig.easing = 'fade';
  }
}
