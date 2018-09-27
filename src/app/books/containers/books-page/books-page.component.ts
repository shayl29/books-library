import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as BookActions from '../../actions/book.actions';
import * as fromBooks from '../../state';
import * as fromRoot from '../../../store/reducers';
import { Book } from '../../../models/book';
import { BookModalFactoryComponent } from '../book-modal-factory/book-modal-factory.component';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {
  @ViewChild(BookModalFactoryComponent) modalFactory: BookModalFactoryComponent;

  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  reset$: Observable<boolean>;
  done$: Observable<boolean>;

  selectedBook: Book;

  constructor(
    private store: Store<fromBooks.State>
  ) {
    this.setSelectors();
  }

  setSelectors() {
    this.searchQuery$ = this.store.pipe(
      select(fromBooks.getSearchQuery),
      take(1)
    );

    this.books$ = this.store.pipe(select(fromBooks.getBookCollection));
    this.done$ = this.store.pipe(select(fromBooks.isDone));
    this.loading$ = this.store.pipe(select(fromBooks.getBookLoading));
    this.error$ = this.store.pipe(select(fromBooks.getSearchError));
    this.reset$ = this.store.pipe(select(fromBooks.isResetOnSearch));

    this.urlQuery();
  }

  ngOnInit() {
    this.searchQuery$.subscribe(query => this.search(query));
  }

  showModal(modalType: string, book) {
    this.modalFactory.openModal(modalType, book);
  }

  search(query: string) {
    this.store.dispatch(new BookActions.Search(query));
  }

  addBook(book) {
    this.store.dispatch(new BookActions.AddBook(book));
  }

  saveBook({ id, book }) {
    this.store.dispatch(new BookActions.EditBook({ id: id, changes: book }));
  }

  deleteBook(book) {
    this.store.dispatch(new BookActions.RemoveBook(book));
  }

  toggleResetList(event) {
    const checked: boolean = event.target.checked;
    this.store.dispatch(new BookActions.ToggleResetList(checked));
  }

  hide() {
    this.store.dispatch(new BookActions.ClearFlags(null));
  }

  urlQuery() {
    this.store.pipe(
      select(fromRoot.getQueryParams),
      take(1)
    ).subscribe(queryParams => {
      if (queryParams && queryParams.query) {
        this.search(queryParams.query);
      }
    });
  }
}
