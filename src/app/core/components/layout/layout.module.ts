import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    RouterModule,
    LayoutComponent
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
