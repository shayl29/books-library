import { Component, Output, EventEmitter, Input, TemplateRef, ViewChild, OnChanges } from '@angular/core';
import { Book, generateMockBook } from '../../../models/book';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-book-modal-factory',
  templateUrl: './book-modal-factory.component.html',
  styleUrls: ['./book-modal-factory.component.scss']
})
export class BookModalFactoryComponent implements OnChanges {
  @ViewChild('addBookTemplate') addBookTemplate: TemplateRef<any>;
  @ViewChild('editBookTemplate') editBookTemplate: TemplateRef<any>;
  @ViewChild('detailsBookTemplate') detailsBookTemplate: TemplateRef<any>;
  @ViewChild('deleteBookTemplate') deleteBookTemplate: TemplateRef<any>;

  @Input() book: Book;
  @Input() books$: Observable<Book[]>;
  @Input() shouldHide: Observable<boolean>;
  @Output() addBook = new EventEmitter();
  @Output() editBook = new EventEmitter();
  @Output() removeBook = new EventEmitter();
  @Output() modalHide = new EventEmitter();

  modalRef: BsModalRef;
  modalConfig: ModalOptions = {
    class: 'modal-lg',
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private modalService: BsModalService
  ) {}

  ngOnChanges() {
    if (this.shouldHide) {
      this.shouldHide.subscribe(res => {
        if (res) {
          this.hide();
        }
      });
    }
  }

  openModal(type, book) {
    this.book = book;
    switch (type) {
      case 'add':
      this.book = generateMockBook();
        this.show(this.addBookTemplate);
        break;
      case 'edit': {
        this.show(this.editBookTemplate);
        break;
      }
      case 'details': {
        this.show(this.detailsBookTemplate);
        break;
      }
      case 'delete': {
        this.show(this.deleteBookTemplate);
        break;
      }
    }
  }

  hide() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.modalHide.emit();
      this.modalRef = null;
    }
  }

  private show(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

}
