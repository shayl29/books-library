import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  @Input() books: Observable<Book[]>;
  @Output() onEditClick: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();
}
