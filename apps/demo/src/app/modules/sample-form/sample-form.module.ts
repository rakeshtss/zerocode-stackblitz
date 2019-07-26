import { NgModule } from '@angular/core';

import { SampleFormRoutingModule } from './sample-form-routing.module';
import { SampleFormComponent } from './sample-form.component';
import { ZcUiFormModule } from '@zc-ui/zc-form';
import { FormTemplate1Component } from './form-template1/form-template1.component';
import { FormTemplate2Component } from './form-template2/form-template2.component';
import { FormTemplate3Component } from './form-template3/form-template3.component';
import { FormTemplate4Component } from './form-template4/form-template4.component';
import { FormTemplate5Component } from './form-template5/form-template5.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SampleFormComponent,
    FormTemplate1Component,
    FormTemplate2Component,
    FormTemplate3Component,
    FormTemplate4Component,
    FormTemplate5Component
  ],
  imports: [CommonModule, ZcUiFormModule, SampleFormRoutingModule]
})
export class SampleFormModule {}
