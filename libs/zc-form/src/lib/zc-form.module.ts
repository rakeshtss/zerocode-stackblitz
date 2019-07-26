import { NgModule } from '@angular/core';
import { ZcFormComponent } from './zc-form.component';
import { FormlyModule } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
export function showErrorOption(field) {
  return (
    (field.formState.submitted ||
      field.formControl.touched ||
      (field.field.validation && field.field.validation.show)) &&
    !field.formControl.valid
  );
}
@NgModule({
  declarations: [ZcFormComponent],
  imports: [
    CommonModule,
    PageRenderModule,
    ReactiveFormsModule,
    NgbModule,
    FormlyModule.forRoot({
      extras: {
        showError: showErrorOption
      }
    })
  ],
  exports: [ZcFormComponent]
})
export class ZcFormModule {}
