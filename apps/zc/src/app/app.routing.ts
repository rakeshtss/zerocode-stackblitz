import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
import { LAZYMODULES } from '@zc-ui/zc-page-builder';
import { PageLayoutComponent } from './modules/pages/page-layout/page-layout.component';
import { PageLayoutGuard } from './guards/page-layout.guard';
import { PageComponent } from './modules/pages/page/page.component';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [PageLayoutGuard],
    component: PageLayoutComponent
  },
  {
    path: ':app',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [PageLayoutGuard],
        component: PageComponent
      },
      {
        path: ':module',
        canActivate: [PageLayoutGuard],
        component: PageComponent
      },
      {
        path: ':module/:page',
        canActivate: [PageLayoutGuard],
        canDeactivate: [CanDeactivateGuard],
        component: PageComponent
      },
      {
        path: ':module/:page/:uid',
        canActivate: [PageLayoutGuard],
        canDeactivate: [CanDeactivateGuard],
        component: PageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot([...routes, ...LAZYMODULES]),
    NgxDynamicTemplateModule.forRoot({ routes: LAZYMODULES })
  ],
  exports: [RouterModule, NgxDynamicTemplateModule]
})
export class AppRoutingModule {}
