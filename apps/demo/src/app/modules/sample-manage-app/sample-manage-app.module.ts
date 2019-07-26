import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SampleManageAppComponent } from './sample-manage-app.component';
import { Routes, RouterModule } from '@angular/router';
import { ZcManageAppModule } from '@zc-ui/zc-manage-app';

const routes: Routes = [
  {
    path: '',
    component: SampleManageAppComponent
  }
];

@NgModule({
  declarations: [SampleManageAppComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ZcManageAppModule],
  exports: [RouterModule]
})
export class SampleManageAppModule {}
