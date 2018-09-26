import { FormControl } from '@angular/forms';

export class ImgUrlValidator {
  static validImgUrl(fc: FormControl) {
      const imgUrl = fc.value as string;
      if (!imgUrl.startsWith('https://')) {
        return { validImgUrl: true };
      }

    return null;
  }
}
