import { Routes, Route, Router } from '@angular/router';
export const LAZYMODULES: Routes = [
  {
    path: 'zc-form',
    loadChildren: '@zc-ui/zc-form#ZcUiFormModule',
    data: {
      type: 'form',
      selector: 'zc-form',
      lazyModule: ['zc-form']
    }
  },
  {
    path: 'zc-form-modal',
    loadChildren: '@zc-ui/zc-form-modal#ZcFormModalModule',
    data: {
      type: 'modal',
      selector: 'zc-form-modal',
      lazyModule: ['zc-form-modal']
    }
  },
  {
    path: 'zc-data-list',
    loadChildren: '@zc-ui/zc-data-list#ZcDataListModule',
    data: {
      type: 'list',
      selector: 'zc-data-list',
      lazyModule: ['zc-data-list']
    }
  },
  {
    path: 'zc-login',
    loadChildren: '@zc-ui/zc-login#ZcWidgetLoginModule',
    data: {
      type: 'login',
      selector: 'zc-login',
      lazyModule: ['zc-login']
    }
  },
  {
    path: 'zc-manage-app',
    loadChildren: '@zc-ui/zc-manage-app#ZcManageAppModule',
    data: {
      type: 'app-selection',
      selector: 'zc-manage-app',
      lazyModule: ['zc-manage-app']
    }
  },
  {
    path: 'zc-menu',
    loadChildren: '@zc-ui/zc-menu#SlideMenuModule',
    data: {
      type: 'menu',
      selector: 'zc-menu',
      lazyModule: ['zc-menu']
    }
  },
  {
    path: 'zc-tabs',
    loadChildren: '@zc-ui/zc-tabs#ZcTabsModule',
    data: {
      type: 'tabs',
      selector: 'zc-tabs',
      lazyModule: ['zc-tabs']
    }
  },
  {
    path: 'zc-accordion',
    loadChildren: '@zc-ui/zc-accordion#ZcAccordionModule',
    data: {
      type: 'accordion',
      selector: 'zc-accordion',
      lazyModule: ['zc-accordion']
    }
  },
  {
    path: 'zc-step-form',
    loadChildren: '@zc-ui/zc-step-form#ZcStepFormModule',
    data: {
      type: 'step-form',
      selector: 'zc-step-form',
      lazyModule: ['zc-step-form']
    }
  },
  {
    path: 'zc-pdf-generator',
    loadChildren: '@zc-ui/zc-pdf-generator#ZcPdfGeneratorModule',
    data: {
      type: 'pdf',
      selector: 'zc-pdf-generator',
      lazyModule: ['zc-pdf-generator']
    }
  },
  {
    path: 'zc-qlana',
    loadChildren: '@zc-ui/clients/qlana#ClientsQlanaModule',
    data: {
      type: 'zc-qlana-stage-view',
      selector: 'zc-qlana-stage-view',
      lazyModule: ['zc-qlana']
    }
  },
  {
    path: 'zc-qlana',
    loadChildren: '@zc-ui/clients/qlana#ClientsQlanaModule',
    data: {
      type: 'zc-qlana-stage-list',
      selector: 'zc-qlana-stage-list',
      lazyModule: ['zc-qlana']
    }
  },
  {
    path: 'zc-bar-chart',
    loadChildren: '@zc-ui/zc-charts#ZcBarChartModule',
    data: {
      type: 'bar-chart',
      selector: 'zc-bar-chart',
      lazyModule: ['zc-bar-chart']
    }
  },
  {
    path: 'zc-pie-chart',
    loadChildren: '@zc-ui/zc-charts#ZcPieChartModule',
    data: {
      type: 'pie-chart',
      selector: 'zc-pie-chart',
      lazyModule: ['zc-pie-chart']
    }
  }
];
