import { AbstractControl, ValidatorFn } from '@angular/forms';
import 'rxjs/add/operator/map';
import { Book } from '../../models/book';

export class ValidateTitleNotTaken {
  static createValidator(books: Book[], bookId: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (!books) {
        return null;
      }

      const bookIndex = books.findIndex(book => {
        return book.id !== bookId && book.volumeInfo.title.toLowerCase() === control.value.toLowerCase();
      });

      return bookIndex === -1
            ? null
            : { titleTaken: true };
    };
  }
}
