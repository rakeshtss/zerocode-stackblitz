import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/manage-app', // /form/template1, /data-list/template1
    pathMatch: 'full'
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'data-list',
        loadChildren:
          './modules/sample-data-list/sample-data-list.module#SampleDataListModule'
      },
      {
        path: 'form',
        loadChildren:
          './modules/sample-form/sample-form.module#SampleFormModule'
      },
      {
        path: 'manage-app',
        loadChildren:
          './modules/sample-manage-app/sample-manage-app.module#SampleManageAppModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
