import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page/page.component';
import { BlockTreeNodeComponent } from './block-tree-node/block-tree-node.component';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
import { PageRenderService } from './page-render.service';
import { ComRenderModule } from './com-render/com-render.module';
@NgModule({
  imports: [CommonModule, NgxDynamicTemplateModule, ComRenderModule],
  declarations: [PageComponent, BlockTreeNodeComponent],
  providers: [PageRenderService],
  exports: [PageComponent,ComRenderModule]
})
export class PageRenderModule { }
