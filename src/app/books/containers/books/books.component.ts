import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as BookActions from '../../actions/book.actions';
import * as fromBooks from '../../state';
import * as fromRoot from '../../../store/reducers';
import { Book, generateMockBook } from '../../../models/book';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  searchQuery$: Observable<string>;
  books$: Observable<Book[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  reset$: Observable<boolean>;

  selectedBook: Book;
  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-lg',
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private store: Store<fromBooks.State>,
    private modalService: BsModalService
  ) {
    this.searchQuery$ = store.pipe(
      select(fromBooks.getSearchQuery),
      take(1)
    );

    this.books$ = store.pipe(select(fromBooks.getBookCollection));

    store.pipe(select(fromBooks.isBookAdded)).subscribe(() => this.hide());

    store.pipe(select(fromBooks.isbookUpdated)).subscribe(() => this.hide());

    store.pipe(select(fromBooks.isBookRemoved)).subscribe(() => this.hide());

    this.loading$ = store.pipe(select(fromBooks.getBookLoading));
    this.error$ = store.pipe(select(fromBooks.getSearchError));
    this.reset$ = store.pipe(select(fromBooks.isResetOnSearch));

    this.urlQuery();
  }

  ngOnInit() {
    this.searchQuery$.subscribe(query => this.search(query));
  }

  search(query: string) {
    this.store.dispatch(new BookActions.Search(query));
  }

  showAddModal(template: TemplateRef<any>) {
    this.selectedBook = generateMockBook();
    this.openModal(template);
  }

  showEditModal(template: TemplateRef<any>, book: Book) {
    this.selectedBook = book;
    this.openModal(template);
  }

  showDetailsModal(template: TemplateRef<any>, book: Book) {
    this.selectedBook = book;
    this.openModal(template);
  }

  showDeleteModal(template: TemplateRef<any>, book: Book) {
    this.selectedBook = book;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

  addBook(book) {
    this.store.dispatch(new BookActions.AddBook(book));
  }

  saveBook(book) {
    this.store.dispatch(new BookActions.EditBook({ id: this.selectedBook.id, changes: book }));
  }

  deleteBook() {
    this.store.dispatch(new BookActions.RemoveBook(this.selectedBook));
  }

  toggleResetList(event) {
    const checked: boolean = event.target.checked;
    this.store.dispatch(new BookActions.ToggleResetList(checked));
  }

  hide() {
    this.store.dispatch(new BookActions.ClearFlags(null));
    if (this.modalRef) {
      this.modalRef.hide();
    }
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
