import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../../models/book';

@Component({
  selector: 'app-find-books',
  templateUrl: './find-books.component.html',
  styleUrls: ['./find-books.component.scss']
})
export class FindBooksComponent implements OnInit {
  @Input() searchQuery$: Observable<string>;
  @Input() books$: Observable<Book[]>;
  @Input() loading$: Observable<boolean>;
  @Input() error$: Observable<string>;
  @Input() reset$: Observable<boolean>;
  @Output() addButtonClicked = new EventEmitter();
  @Output() search = new EventEmitter();
  @Output() resetCheckChanged = new EventEmitter();

  ngOnInit() {}
}
