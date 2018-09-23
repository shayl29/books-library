import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input() book: Observable<Book>;
}
