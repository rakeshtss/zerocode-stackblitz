import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcTabsComponent } from './zc-tabs/zc-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  imports: [CommonModule, MatTabsModule, PageRenderModule, MatTooltipModule],
  declarations: [ZcTabsComponent],
  exports: [ZcTabsComponent]
})
export class ZcTabsModule {}
