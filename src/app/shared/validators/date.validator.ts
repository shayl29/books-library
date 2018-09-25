import { FormControl } from '@angular/forms';

export class DateValidator {
  static validDate(fc: FormControl) {
      const date = new Date(fc.value);
      if (!date.toJSON()) {
        return { validDate: true };
      }

    return null;
  }
}
