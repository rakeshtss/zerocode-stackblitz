import { HttpClient } from '@angular/common/http';

export interface ZcPieChartConfig {
  // chartType?: string;
    // view?: string;
    // colorScheme?: string;
    // schemeType?: string;
    // customColors?: string;
    // data?: any;
    // animations?: any;
    // gradient?: any;
    // showXAxis?: any;
    // showYAxis?: any;
    // showLegend?: any;
    // legendTitle?: any;
    // showXAxisLabel?: any;
    // showYAxisLabel?: any;
    // tooltipDisabled?: any;
    // xAxisLabel?: any;
    // yAxisLabel?: any;
    // showGridLines?: any;
    // barPadding?: any;
    // groupPadding?: any;
    // roundDomains?: boolean;
    // roundEdges?: any;
    // xScaleMax?: any;
    // xScaleMin?: any;
    // yScaleMax?: any;
    // yScaleMin?: any;
    // showDataLabel?: any;
    // arcWidth?: any;
    // valueFormatting?: any;
    // doughnut?: any;
    // tooltipText?: any;
    // autoScale?: any;
    // showSeriesOnHover?: any;
    // minRadius?: any;
    // maxRadius?: any;
    // closedCurve?: any;
    // explodeSlices?: any;
    // labels?: any;
    // curve?: any;
    // rangeFillOpacity?: any;
    // timeline?: any;
    title: string;
    description: string;
    displayTitle: boolean;
    chartType: string;
    labels: string;
    data: any;
    chartGroups: any[];
    chart: any;
    schemeType?: string;
    colorScheme?: {
        domain?: any[]
    };
    customColors?: any[];
    realTimeData?: boolean;
    countries?: any[];
    single?: any[];
    multi?: any[];
    fiscalYearReport?: any[];
    dateData?: any[];
    dateDataWithRange?: any[];
    calendarData?: any[];
    statusData?: any[];
    sparklineData?: any[];
    timelineFilterBarData?: any[];
    graph?: { links: any[]; nodes: any[] };
    bubble?: any;
    linearScale?: boolean;
    range?: boolean;

    view?: any[];
    width?: number;
    height?: number;
    fitContainer?: boolean;

    // options
    showXAxis?: boolean;
    showYAxis?: boolean;
    gradient?: boolean;
    showLegend?: boolean;
    legendTitle?: string;
    legendPosition?: string;
    showXAxisLabel?: boolean;
    tooltipDisabled?: boolean;
    xAxisLabel?: string;
    showYAxisLabel?: boolean;
    yAxisLabel?: string;
    showGridLines?: boolean;
    innerPadding?: string;
    barPadding?: number;
    groupPadding?: number;
    roundDomains?: boolean;
    maxRadius?: number;
    minRadius?: number;
    showSeriesOnHover?: boolean;
    roundEdges?: boolean;
    animations?: boolean;
    xScaleMin?: any;
    xScaleMax?: any;
    yScaleMin?: number;
    yScaleMax?: number;
    showDataLabel?: boolean;
    // pie
    showLabels?: true;
    explodeSlices?: false;
    doughnut?: false;
    arcWidth?: number;

    // line, area
    autoScale?: true;
    timeline?: false;

    // margin
    margin?: boolean;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    curve?: any;
    tooltipText?: any;
    valueFormatting?: any;
    rangeFillOpacity?: number;
    closedCurve?: any;
    icon?: string;
    link?: {
        icon?: string;
        url?: string;
    };
    http?: HttpClient;
    [string: string]: any;
}
