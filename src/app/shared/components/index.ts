import { NgModule } from '@angular/core';
import { LoadingComponent } from './loading/loading.component';
import { HalfCircleSpinnerModule } from 'angular-epic-spinners';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, HalfCircleSpinnerModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class ComponentsModule {}
