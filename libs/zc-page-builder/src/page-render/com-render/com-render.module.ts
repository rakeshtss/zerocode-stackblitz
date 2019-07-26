import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComRenderComponent } from './com-render.component';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
@NgModule({
  declarations: [ComRenderComponent],
  imports: [
    CommonModule,
    NgxDynamicTemplateModule
  ],
  exports: [ComRenderComponent]
})
export class ComRenderModule { }
