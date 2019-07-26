import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcAccordionComponent } from './zc-accordion/zc-accordion.component';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import {AccordionModule} from 'primeng/accordion';

@NgModule({
  imports: [ CommonModule, PageRenderModule, AccordionModule ],
  declarations: [ZcAccordionComponent],
  exports: [ZcAccordionComponent]
})
export class ZcAccordionModule {}
