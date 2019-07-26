import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { SwipeService } from './slideshow/swipe.service';
import { BrowserTransferStateModule } from '@angular/platform-browser';
import { GalleriaModule } from 'primeng/galleria';
@NgModule({
  imports: [CommonModule, BrowserTransferStateModule, GalleriaModule],
  declarations: [SlideshowComponent],
  providers: [SwipeService],
  exports: [SlideshowComponent]
})
export class ZcImageSlideshowModule {}
