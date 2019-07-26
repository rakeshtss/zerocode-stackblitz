import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcBarChartComponent } from './zc-bar-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [ZcBarChartComponent],
  imports: [CommonModule, NgxChartsModule],
  exports: [ZcBarChartComponent]
})
export class ZcBarChartModule { }
