import { FormControl } from '@angular/forms';

export class ImgUrlValidator {
  static validImgUrl(fc: FormControl) {
      const imgUrl = fc.value as string;
      if (imgUrl === '') {
        return null;
      }

      if (!imgUrl.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)) {
        return { validImgUrl: true };
      }

    return null;
  }
}
