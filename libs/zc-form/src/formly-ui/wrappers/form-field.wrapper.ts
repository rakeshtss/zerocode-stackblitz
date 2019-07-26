import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-form-field',
  template: `
    <div
      class="form-group"
      [class.has-error]="showError"
      [ngClass]="to.mode === 'view' ? 'view' : ''"
    >
      <label *ngIf="to.label && to.hideLabel !== true" [attr.for]="id">
        {{ to.label }}
        <span
          class="required-star"
          *ngIf="
            to.required && to.hideRequiredMarker !== true && to.mode !== 'view'
          "
          >*</span
        >
      </label>
      <div class="field" [id]="to.id ? 'field-' + to.id : 'field-' + field.key">
        <ng-template #fieldComponent></ng-template>
      </div>
      <div
        *ngIf="showError && to.mode !== 'view'"
        class="invalid-feedback"
        [style.display]="'block'"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <small *ngIf="to.description" class="form-text text-muted">{{
        to.description
      }}</small>
    </div>
  `
})
export class ZcWrapperFormFieldComponent extends FieldWrapper {
  to: any;
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent!: ViewContainerRef;
}
