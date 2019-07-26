import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcPieChartComponent } from './zc-pie-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ZcPieChartComponent],
  imports: [
    CommonModule, NgxChartsModule
  ],
  exports: [ZcPieChartComponent]
})
export class ZcPieChartModule { }
