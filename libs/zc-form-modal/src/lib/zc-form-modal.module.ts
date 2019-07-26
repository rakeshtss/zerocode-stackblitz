import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcFormModalComponent } from './zc-form-modal/zc-form-modal.component';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [CommonModule, NgbModule, PageRenderModule],
  declarations: [ZcFormModalComponent],
  exports: [ZcFormModalComponent]
})
export class ZcFormModalModule {}
