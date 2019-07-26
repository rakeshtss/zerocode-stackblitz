import { Component, OnInit, Input } from '@angular/core';
import { ZcBarChartConfig } from './zc-bar-chart-config';

@Component({
  selector: 'zc-bar-chart',
  templateUrl: './zc-bar-chart.component.html',
  styleUrls: ['./zc-bar-chart.component.scss']
})
export class ZcBarChartComponent implements OnInit {
  @Input() options: ZcBarChartConfig;
  constructor() { }

  ngOnInit() {
    if (!this.options.chartType) {
      this.options.chartType = 'vertical';
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

  onLegendLabelClick(entry) {
    console.log('onLegendLabelClick', entry);
  }

  select(entry) {
    console.log('select', entry);
  }

  dblclick(entry) {
    console.log('dblclick', entry);
  }

  setChartData(type) {
    switch (type) {
      case 'vertical': {
        this.options.title = 'Vertical Bar Chart';
        this.barVerticalHorizontal();
        break;
      }
      case 'horizontal': {
        this.options.title = 'Horizontal Bar Chart';
        this.barVerticalHorizontal();
        break;
      }
      case 'grouped-vertical': {
        this.options.title = 'Grouped Vertical Bar Chart';
        this.options.schemeType = 'ordinal';
        this.barGroupVerticalHorizontal();
        break;
      }
      case 'grouped-horizontal': {
        this.options.title = 'Grouped Horizontal Bar Chart';
        this.options.schemeType = 'ordinal';
        this.barGroupVerticalHorizontal();
        break;
      }
      case 'stacked-vertical': {
        this.options.title = 'Stacked Vertical Bar Chart';
        this.options.schemeType = 'ordinal';
        this.barGroupVerticalHorizontal();
        break;
      }
      case 'stacked-horizontal': {
        this.options.title = 'Stacked Horizontal Bar Chart';
        this.options.schemeType = 'ordinal';
        this.barGroupVerticalHorizontal();
        break;
      }

      case 'normalized-vertical': {
        this.options.title = 'Normalized Vertical Bar Chart';
        this.options.schemeType = 'ordinal';
        this.barGroupVerticalHorizontal();
        break;
      }
      case 'normalized-horizontal': {
        this.options.title = 'Normalized Horizontal Bar Chart';
        this.options.schemeType = 'ordinal';
        this.barGroupVerticalHorizontal();
        break;
      }
      default: {
        this.options.title = 'Vertical Bar Chart';
        this.barVerticalHorizontal();
        break;
      }
    }
  }

  barVerticalHorizontal() {
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
  // Json forn Grouped chart
  barGroupVerticalHorizontal() {
    this.options.data = [
      {
        "name": "Germany",
        "series": [
          {
            "name": "2010",
            "value": 40632
          },
          {
            "name": "2000",
            "value": 36953
          },
          {
            "name": "1990",
            "value": 31476
          }
        ]
      },
      {
        "name": "United States",
        "series": [
          {
            "name": "2010",
            "value": 49737
          },
          {
            "name": "2000",
            "value": 45986
          },
          {
            "name": "1990",
            "value": 37060
          }
        ]
      },
      {
        "name": "France",
        "series": [
          {
            "name": "2010",
            "value": 36745
          },
          {
            "name": "2000",
            "value": 34774
          },
          {
            "name": "1990",
            "value": 29476
          }
        ]
      },
      {
        "name": "United Kingdom",
        "series": [
          {
            "name": "2010",
            "value": 36240
          },
          {
            "name": "2000",
            "value": 32543
          },
          {
            "name": "1990",
            "value": 26424
          }
        ]
      }
    ];
  }


}
