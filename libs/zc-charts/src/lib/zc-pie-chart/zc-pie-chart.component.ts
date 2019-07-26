import { Component, OnInit, Input } from '@angular/core';
import { ZcPieChartConfig } from './zc-pie-chart-config';

@Component({
  selector: 'zc-pie-chart',
  templateUrl: './zc-pie-chart.component.html',
  styleUrls: ['./zc-pie-chart.component.scss']
})
export class ZcPieChartComponent implements OnInit {
  @Input() options: ZcPieChartConfig;
  constructor() { }

  ngOnInit() {
    if (!this.options.chartType) {
      this.options.chartType = 'pie';
    }

    this.options.legendTitle = 'Legend';
    this.options.xAxisLabel = 'Country';
    this.options.yAxisLabel = 'GDP Per Capita';
    this.options.fitContainer = true;
    this.options.showXAxis = true;
    this.options.showYAxis = true;
    this.options.showXAxisLabel = true;
    this.options.showYAxisLabel = true;
    this.options.view = [700, 400];
    this.options.colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    this.options.displayTitle = true;
    this.options.title = 'Bar Chart';
    this.setChartData(this.options.chartType);
    console.log('options', this.options);
  }

  setChartData(type) {
    switch (type) {
      case 'pie': {
        this.options.title = 'Pie Chart';
        this.getChartJSON();
        break;
      }
      case 'advanced-pie': {
        this.options.title = 'Advanced Pie Chart';
        this.getChartJSON();
        break;
      }
      case 'pie-grid': {
        this.options.title = 'Pie Grid Chart';
        // this.options.schemeType = 'ordinal';
        this.getChartJSON();
        break;
      }
      default: {
        this.options.title = 'Pie Chart';
        this.getChartJSON();
        break;
      }
    }
  }

  getChartJSON() {
    this.options.data = [
      {
        "name": "Germany",
        "value": 40632
      },
      {
        "name": "United States",
        "value": 49737
      },
      {
        "name": "France",
        "value": 36745
      },
      {
        "name": "United Kingdom",
        "value": 25240
      },
      {
        "name": "Spain",
        "value": 33000
      },
      {
        "name": "Italy",
        "value": 35800
      }
    ];
  }
}
