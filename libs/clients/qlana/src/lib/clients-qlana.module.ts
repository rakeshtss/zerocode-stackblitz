import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QlanaStageViewComponent } from './qlana-stage-view/qlana-stage-view.component';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import { QlanaStageListComponent } from './qlana-stage-list/qlana-stage-list.component';
@NgModule({
  imports: [CommonModule, PageRenderModule],
  declarations: [QlanaStageViewComponent, QlanaStageListComponent],
  exports: [QlanaStageViewComponent, QlanaStageListComponent]
})
export class ClientsQlanaModule { }
