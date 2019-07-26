import { NgModule } from '@angular/core';
import { ZcFormModule } from './lib/zc-form.module';
import { FormlyBootstrapModule } from './formly-ui/bootstrap';

@NgModule({
  imports: [ZcFormModule, FormlyBootstrapModule],
  exports: [ZcFormModule]
})
export class ZcUiFormModule {}
