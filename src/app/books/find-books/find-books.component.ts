import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take, first } from 'rxjs/operators';
import * as BookActions from '../actions/book.actions';
import * as fromBooks from '../state'
import { Book } from '../../models/book';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


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
  
  selectedBook: Book;
  modalRef: BsModalRef;

  constructor(
    private store: Store<fromBooks.State>,
    private modalService: BsModalService
  ) {
    this.searchQuery$ = store.pipe(
      select(fromBooks.getSearchQuery),
      take(1)
    );

    this.books$ = store.pipe(select(fromBooks.getSearchResults));
    this.selectedBooks = this.books$.pipe(
      select(f => f.slice(0, 10)));

    this.loading$ = store.pipe(select(fromBooks.getSearchLoading));
    this.error$ = store.pipe(select(fromBooks.getSearchError));
  }

  ngOnInit() {
  }

  search(query: string) {
    this.store.dispatch(new BookActions.Search(query));
  }

  showAddModal(template: TemplateRef<any>) {
    this.openModal(template);
  }

  showEditModal(template: TemplateRef<any>, book: Book) {
    this.selectedBook = book;
    this.openModal(template);
  }

  showDeleteModal(template: TemplateRef<any>, book: Book) {
    this.selectedBook = book;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  deleteBook() {
    console.log(this.selectedBook);
    this.modalRef.hide();
    // TODO: Delete book from store
  }
}
