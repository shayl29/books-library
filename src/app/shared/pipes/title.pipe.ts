import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'title' })
export class TitlePipe implements PipeTransform {
    public transform(input: string): string {
        if (!input) {
            return '';
        } else {
            const alphaNumStr = input.replace(/[^a-zA-Z0-9 ]/g, '');
            return alphaNumStr.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
        }
    }
}
