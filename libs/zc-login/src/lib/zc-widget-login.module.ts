import { NgModule } from '@angular/core';
import { ZcWidgetLoginComponent } from './zc-widget-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZcWidgetLoginService } from './zc-widget-login.service';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, PageRenderModule],
  declarations: [ZcWidgetLoginComponent],
  providers: [ZcWidgetLoginService],
  exports: [ZcWidgetLoginComponent]
})
export class ZcWidgetLoginModule {}
