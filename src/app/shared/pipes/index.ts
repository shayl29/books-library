import { NgModule } from '@angular/core';

import { AddCommasPipe } from './add-commas.pipe';
import { EllipsisPipe } from './ellipsis.pipe';
import { FixThumbnailPipe } from './fix-thumbnail.pipe';
import { TitlePipe } from './title.pipe';


@NgModule({
    declarations: [AddCommasPipe, EllipsisPipe, FixThumbnailPipe, TitlePipe],
    exports: [AddCommasPipe, EllipsisPipe, FixThumbnailPipe, TitlePipe],
  })
  export class PipesModule {}
  