import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fixThumbnail' })
export class FixThumbnailPipe implements PipeTransform {
    transform(url: string) {
        if (!url) {
            return 'assets/nopic.png';
        }
        const fixedUrl = url.replace('http', 'https').replace('zoom=5&edge=curl&', '');
        return fixedUrl;
    }
}
