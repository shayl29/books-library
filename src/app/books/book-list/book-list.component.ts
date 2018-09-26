import { Component, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  @Input() books: Observable<Book[]>;
  @Output() editClicked: EventEmitter<any> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<any> = new EventEmitter();
  @Output() bodyClicked: EventEmitter<any> = new EventEmitter();
}
