import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../time-ago/time-ago.pipe';
import { ActionsComponent } from '../actions/actions.component';
import { ZcImageSlideshowModule } from '@zc-ui/zc-image-slideshow';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [TimeAgoPipe, ActionsComponent],
  imports: [CommonModule, NgbModule, ZcImageSlideshowModule],
  exports: [TimeAgoPipe, ActionsComponent, ZcImageSlideshowModule]
})
export class DataListSharedModule { }
