import { NgModule } from '@angular/core';

import { AddCommasPipe } from './add-commas.pipe';
import { EllipsisPipe } from './ellipsis.pipe';
import { FixThumbnailPipe } from './fix-thumbnail.pipe';
import { TitlePipe } from './title.pipe';
import { DateFormatPipe } from './dateFormat.pipe';

const pipes = [
  AddCommasPipe,
  EllipsisPipe,
  FixThumbnailPipe,
  TitlePipe,
  DateFormatPipe
];

@NgModule({
    declarations: pipes,
    exports: pipes,
  })
  export class PipesModule {}
