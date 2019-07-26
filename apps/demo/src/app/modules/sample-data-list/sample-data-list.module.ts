import { NgModule } from '@angular/core';
import { SampleDataListRoutingModule } from './sample-data-list-routing.module';
import { SampleDataListComponent } from './sample-data-list.component';
import { ZcDataListModule } from '@zc-ui/zc-data-list';
import { DataListTemplate1Component } from './data-list-template1/data-list-template1.component';
import { DataListTemplate2Component } from './data-list-template2/data-list-template2.component';
import { DataListCardTemplate1Component } from './data-list-card-template1/data-list-card-template1.component';
import { DataListTemplate3Component } from './data-list-template3/data-list-template3.component';
import { DataListTemplate4Component } from './data-list-template4/data-list-template4.component';
import { DataListTemplate5Component } from './data-list-template5/data-list-template5.component';
import { DataListTemplate6Component } from './data-list-template6/data-list-template6.component';
import { DataListCardTemplate2Component } from './data-list-card-template2/data-list-card-template2.component';
import { DataListCardTemplate3Component } from './data-list-card-template3/data-list-card-template3.component';
import { DataListCardTemplate4Component } from './data-list-card-template4/data-list-card-template4.component';
import { DataListCardTemplate5Component } from './data-list-card-template5/data-list-card-template5.component';
import { DataListCardTemplate7Component } from './data-list-card-template7/data-list-card-template7.component';
import { DataListCardTemplate6Component } from './data-list-card-template6/data-list-card-template6.component';
import { DataListCardTemplate8Component } from './data-list-card-template8/data-list-card-template8.component';
import { DataListTemplate7Component } from './data-list-template7/data-list-template7.component';
import { DataListTemplate8Component } from './data-list-template8/data-list-template8.component';
import { DataListTemplate9Component } from './data-list-template9/data-list-template9.component';

@NgModule({
  declarations: [
    SampleDataListComponent,
    DataListTemplate1Component,
    DataListTemplate2Component,
    DataListTemplate3Component,
    DataListTemplate4Component,
    DataListTemplate5Component,
    DataListTemplate6Component,
    DataListCardTemplate1Component,
    DataListCardTemplate2Component,
    DataListCardTemplate3Component,
    DataListCardTemplate4Component,
    DataListCardTemplate5Component,
    DataListCardTemplate6Component,
    DataListCardTemplate7Component,
    DataListCardTemplate8Component,
    DataListTemplate7Component,
    DataListTemplate8Component,
    DataListTemplate9Component
  ],
  imports: [ZcDataListModule, SampleDataListRoutingModule]
})
export class SampleDataListModule {}
