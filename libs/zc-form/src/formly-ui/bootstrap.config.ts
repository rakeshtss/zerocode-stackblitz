import { ConfigOption } from '@ngx-formly/core';
import {
  ZcInputComponent,
  ZcMultiCheckboxComponent,
  ZcTextComponent,
  ZcChipsComponent,
  ZcTableComponent,
  ZcButtonComponent,
  ZcSelectComponent,
  ZcRadioComponent,
  ZcCheckboxComponent,
  ZcTextareaComponent,
  ZcHtmlEditorComponent,
  ZcDateTimeComponent,
  ZcDateComponent,
  ZcTimeComponent,
  ZcGmapComponent,
  ZcAutocompleteComponent,
  ZcFileComponent,
  ZcNumberComponent,
  ZcPasswordComponent,
  ZcBooleanComponent,
  ZcImageComponent,
  ZcCaptchaComponent,
  ZcDateRangeComponent
} from './types/types';
import { ZcWrapperFormFieldComponent } from './wrappers/wrappers';
import { FormControl } from '@angular/forms';

export const FIELD_TYPE_COMPONENTS = [
  // types
  ZcInputComponent,
  ZcMultiCheckboxComponent,
  ZcTextComponent,
  ZcChipsComponent,
  ZcTableComponent,
  ZcButtonComponent,

  // new
  ZcSelectComponent,
  ZcRadioComponent,
  ZcCheckboxComponent,
  ZcTextareaComponent,
  ZcHtmlEditorComponent,
  ZcDateTimeComponent,
  ZcDateComponent,
  ZcTimeComponent,
  ZcDateRangeComponent,
  ZcGmapComponent,
  ZcAutocompleteComponent,
  ZcFileComponent,
  ZcNumberComponent,
  ZcPasswordComponent,
  ZcBooleanComponent,
  ZcImageComponent,
  ZcCaptchaComponent,

  // wrappers
  ZcWrapperFormFieldComponent
];
export function minlengthValidationMessage(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${
    field.templateOptions.maxLength
    } characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}
export function TableRequiredValidator(c: FormControl, f): boolean {
  return f.templateOptions.required ? c.value && c.value.length > 0 : true;
}
export function SelectValidator(c: FormControl, f): boolean {
  return f.templateOptions.required && !f.templateOptions.multiple
    ? c.value && c.value.uid
    : true;
}
export function CheckboxValidator(c: FormControl, f: any): boolean {
  return f.templateOptions.required ? (c.value === true) ? true : false : true;
}
export function serverError(err, field) {
  return err;
}
export const BOOTSTRAP_FORMLY_CONFIG: ConfigOption = {
  validationMessages: [
    { name: 'required', message: 'This field is required' },
    { name: 'pattern', message: 'This field is invalid' },
    { name: 'minlength', message: minlengthValidationMessage },
    { name: 'maxlength', message: maxlengthValidationMessage },
    { name: 'min', message: minValidationMessage },
    { name: 'max', message: maxValidationMessage },
    { name: 'server-error', message: serverError }
  ],
  types: [
    {
      name: 'captcha',
      component: ZcCaptchaComponent,
      wrappers: ['form-field'],
      defaultOptions: {
        templateOptions: {
          hideLabel: true
        }
      }
    },
    {
      name: 'button',
      component: ZcButtonComponent,
      defaultOptions: {
        templateOptions: {
          hideLabel: true
        }
      },
      wrappers: ['form-field']
    },
    {
      name: 'table',
      component: ZcTableComponent,
      wrappers: ['form-field'],
      defaultOptions: {
        defaultValue: [],
        validators: {
          required: {
            expression: TableRequiredValidator
          }
        }
      }
    },
    {
      name: 'text',
      component: ZcTextComponent,
      wrappers: ['form-field']
    },
    {
      name: 'input',
      component: ZcInputComponent,
      wrappers: ['form-field']
    },
    {
      name: 'checkbox',
      component: ZcCheckboxComponent,
      wrappers: ['form-field'],
      defaultOptions: {

        validators: {
          required: {
            expression: CheckboxValidator
          }
        }
      }
    },
    {
      name: 'radio',
      component: ZcRadioComponent,
      wrappers: ['form-field'],
      defaultOptions: {
        templateOptions: {
          options: []
        },
        validators: {
          required: {
            expression: SelectValidator
          }
        }
      }
    },
    {
      name: 'select',
      component: ZcSelectComponent,
      wrappers: ['form-field'],
      defaultOptions: {
        templateOptions: {
          options: []
        },
        validators: {
          required: {
            expression: SelectValidator
          }
        }
      }
    },
    {
      name: 'textarea',
      component: ZcTextareaComponent,
      wrappers: ['form-field']
    },
    {
      name: 'html-editor',
      component: ZcHtmlEditorComponent,
      wrappers: ['form-field']
    },
    {
      name: 'multicheckbox',
      component: ZcMultiCheckboxComponent,
      wrappers: ['form-field']
    },
    {
      name: 'autocomplete',
      component: ZcAutocompleteComponent,
      wrappers: ['form-field']
    },
    {
      name: 'datetime',
      component: ZcDateTimeComponent,
      wrappers: ['form-field']
    },
    {
      name: 'date',
      component: ZcDateComponent,
      wrappers: ['form-field']
    },
    {
      name: 'time',
      component: ZcTimeComponent,
      wrappers: ['form-field']
    },
    {
      name: 'daterange',
      component: ZcDateRangeComponent,
      wrappers: ['form-field']
    },
    {
      name: 'map',
      component: ZcGmapComponent,
      wrappers: ['form-field']
    },
    {
      name: 'file',
      component: ZcFileComponent,
      wrappers: ['form-field']
    },
    {
      name: 'image',
      component: ZcImageComponent,
      wrappers: ['form-field']
    },
    {
      name: 'number',
      component: ZcNumberComponent,
      wrappers: ['form-field']
    },
    {
      name: 'password',
      component: ZcPasswordComponent,
      wrappers: ['form-field']
    },
    {
      name: 'boolean',
      component: ZcBooleanComponent,
      wrappers: ['form-field']
    }
  ],
  wrappers: [{ name: 'form-field', component: ZcWrapperFormFieldComponent }]
};
