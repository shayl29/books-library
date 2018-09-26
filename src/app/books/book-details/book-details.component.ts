import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnChanges {
  @Input() book: Book;
  @Output() editClicked: EventEmitter<any> = new EventEmitter();
  @Output() deleteClicked: EventEmitter<any> = new EventEmitter();
  @Output() bodyClicked: EventEmitter<any> = new EventEmitter();

  private url = '';

  ngOnChanges(changes) {
    this.imgUrl = this.book.volumeInfo.imageLinks.smallThumbnail;
  }

  get imgUrl() {
    return this.url;
  }

  set imgUrl(value) {
    this.url = value;
  }

  imgUrlError() {
    this.imgUrl = 'assets/nopic.png';
  }
}
