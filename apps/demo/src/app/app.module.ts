// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { NavListComponent } from './navbar/nav-list/nav-list.component';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
import {
  CommonModule,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { ToasterService, ZcUtilitiesModule } from '@zc-ui/zc-utilities';
@NgModule({
  declarations: [AppComponent, NavbarComponent, NavListComponent],
  imports: [
    AppRoutingModule,
    NgxDynamicTemplateModule.forRoot(),
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ZcUtilitiesModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
