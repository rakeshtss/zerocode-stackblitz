import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { AppHttpClient } from './services/service';
import { ZcFieldValueFormaterDirective } from './directives/zc-field-value-formater.directive';
import { ZcDailogModule } from './modules/zc-dialog/zc-dialog';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      closeButton: true
    }),
    ZcDailogModule
  ],
  providers: [AppHttpClient],
  declarations: [ZcFieldValueFormaterDirective],
  exports: [ToastrModule, ZcFieldValueFormaterDirective]
})
export class ZcUtilitiesModule { }
