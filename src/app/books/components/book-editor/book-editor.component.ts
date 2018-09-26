import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../../models/book';
import { DateValidator } from '../../../shared/validators/date.validator';
import { ValidateTitleNotTaken } from '../../../shared/validators/title-not-taken.validator';

@Component({
  selector: 'app-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnChanges {
  @Input()
  book: Book;
  @Input()
  books: Book[];
  @Output()
  cancelEdit = new EventEmitter();
  @Output()
  doneEdit = new EventEmitter<Book>();

  form: FormGroup;

  get authors(): String[] {
    return this.form.get('volumeInfo.authors').value;
  }

  constructor(private fb: FormBuilder) {}

  ngOnChanges() {
    this.initForm();
  }

  submitChanges() {
    // tslint:disable-next-line:forin
    for (const c in this.form.controls) {
      this.form.controls[c].markAsTouched();
    }

    if (this.form.valid) {
      this.doneEdit.emit({
        ...this.form.value,
        volumeInfo: {
          ...this.form.value.volumeInfo,
          authors: this.authors.filter(a => a !== '')
        }
      });
    }
  }

  initForm() {
    this.form = this.fb.group({
      id: [this.book.id || '', Validators.required],
      volumeInfo: this.fb.group({
        title: [
          this.book.volumeInfo.title || '',
          Validators.compose([
            Validators.required,
            ValidateTitleNotTaken.createValidator(this.books, this.book.id)
          ])
        ],
        publishedDate: [
          this.formatDate(this.book.volumeInfo.publishedDate) || '',
          Validators.compose([Validators.required, DateValidator.validDate])
        ],
        authors: [[''], Validators.required],
        imageLinks: this.fb.group({
          smallThumbnail: [this.book.volumeInfo.imageLinks.smallThumbnail]
        }),
        description: [
          this.book.volumeInfo.description || '',
          Validators.required
        ]
      })
    });

    this.book.volumeInfo.authors.forEach(author => this.addAuthor(author));
  }

  formatDate(dateString: string): string {
    let retString = '';

    const date = new Date(dateString);

    if (date) {
      const dd = date.getDate();
      const mm = date.getMonth() + 1;
      const yyyy = date.getFullYear();

      retString += yyyy;

      if (mm < 10) {
        retString += `-0${mm}`;
      } else {
        retString += `-${mm}`;
      }

      if (dd === 0) {
        retString += `-01`;
      } else if (dd < 10) {
        retString += `-0${dd}`;
      } else {
        retString += `-${dd}`;
      }
    }

    return retString;
  }

  addAuthor(author?) {
    if (this.authors[0] === '') {
      this.authors[0] = author || '';
    } else {
      this.authors.push(author || '');
    }
  }

  updateAuthor(index, event) {
    const val = event.target.value;
    this.authors[index] = val;
  }
}
