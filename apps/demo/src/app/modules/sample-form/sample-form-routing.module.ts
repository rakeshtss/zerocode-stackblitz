import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleFormComponent } from './sample-form.component';
import { FormTemplate1Component } from './form-template1/form-template1.component';
import { FormTemplate2Component } from './form-template2/form-template2.component';
import { FormTemplate3Component } from './form-template3/form-template3.component';
import { FormTemplate4Component } from './form-template4/form-template4.component';
import { FormTemplate5Component } from './form-template5/form-template5.component';

const routes: Routes = [
  {
    path: '',
    component: SampleFormComponent
  },
  {
    path: 'template1',
    component: FormTemplate1Component
  },
  {
    path: 'template2',
    component: FormTemplate2Component
  },
  {
    path: 'template3',
    component: FormTemplate3Component
  },
  {
    path: 'template4',
    component: FormTemplate4Component
  },
  {
    path: 'template5',
    component: FormTemplate5Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleFormRoutingModule {}
