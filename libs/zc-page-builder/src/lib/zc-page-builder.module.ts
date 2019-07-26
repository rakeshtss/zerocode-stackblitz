import { NgModule } from '@angular/core';
import { PageRenderModule } from '../page-render/page-render.module';

@NgModule({
  imports: [PageRenderModule],
  exports: [PageRenderModule]
})
export class ZcPageBuilderModule {}
