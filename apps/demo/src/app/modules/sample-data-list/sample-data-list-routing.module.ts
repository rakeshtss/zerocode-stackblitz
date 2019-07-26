import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleDataListComponent } from './sample-data-list.component';
import { DataListTemplate1Component } from './data-list-template1/data-list-template1.component';
import { DataListTemplate2Component } from './data-list-template2/data-list-template2.component';
import { DataListCardTemplate1Component } from './data-list-card-template1/data-list-card-template1.component';
import { DataListTemplate3Component } from './data-list-template3/data-list-template3.component';
import { DataListTemplate4Component } from './data-list-template4/data-list-template4.component';
import { DataListTemplate5Component } from './data-list-template5/data-list-template5.component';
import { DataListTemplate6Component } from './data-list-template6/data-list-template6.component';
import { DataListTemplate7Component } from './data-list-template7/data-list-template7.component';
import { DataListTemplate8Component } from './data-list-template8/data-list-template8.component';
import { DataListTemplate9Component } from './data-list-template9/data-list-template9.component';

import { DataListCardTemplate2Component } from './data-list-card-template2/data-list-card-template2.component';
import { DataListCardTemplate3Component } from './data-list-card-template3/data-list-card-template3.component';
import { DataListCardTemplate4Component } from './data-list-card-template4/data-list-card-template4.component';
import { DataListCardTemplate5Component } from './data-list-card-template5/data-list-card-template5.component';
import { DataListCardTemplate6Component } from './data-list-card-template6/data-list-card-template6.component';
import { DataListCardTemplate7Component } from './data-list-card-template7/data-list-card-template7.component';
import { DataListCardTemplate8Component } from './data-list-card-template8/data-list-card-template8.component';

const routes: Routes = [
  {
    path: '',
    component: SampleDataListComponent
  },
  {
    path: 'template1',
    component: DataListTemplate1Component
  },
  {
    path: 'template2',
    component: DataListTemplate2Component
  },
  {
    path: 'template3',
    component: DataListTemplate3Component
  },
  {
    path: 'template4',
    component: DataListTemplate4Component
  },
  {
    path: 'template5',
    component: DataListTemplate5Component
  },
  {
    path: 'template6',
    component: DataListTemplate6Component
  },
  {
    path: 'template7',
    component: DataListTemplate7Component
  },
  {
    path: 'template8',
    component: DataListTemplate8Component
  },
  {
    path: 'template9',
    component: DataListTemplate9Component
  },
  {
    path: 'card-template1',
    component: DataListCardTemplate1Component
  },
  {
    path: 'card-template2',
    component: DataListCardTemplate2Component
  },
  {
    path: 'card-template3',
    component: DataListCardTemplate3Component
  },
  {
    path: 'card-template4',
    component: DataListCardTemplate4Component
  },
  {
    path: 'card-template5',
    component: DataListCardTemplate5Component
  },
  {
    path: 'card-template6',
    component: DataListCardTemplate6Component
  },
  {
    path: 'card-template7',
    component: DataListCardTemplate7Component
  },
  {
    path: 'card-template8',
    component: DataListCardTemplate8Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleDataListRoutingModule {}
