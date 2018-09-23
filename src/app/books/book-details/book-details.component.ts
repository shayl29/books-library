import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input() book: Observable<Book>;
  @Output() onEditClick: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClick: EventEmitter<any> = new EventEmitter();
}
