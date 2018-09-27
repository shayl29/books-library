import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styles: ['./book-modal.component.scss']
})
export class BookModalComponent {
  @Input() title: string;
  @Output() hide = new EventEmitter();
}
