import { Component, OnInit, OnDestroy } from '@angular/core';
import { FieldType, Field } from '@ngx-formly/core';
import { FormFieldService } from '../../services/form-field.service';
import { Subject } from 'rxjs';
import { takeUntil, startWith, tap } from 'rxjs/operators';
declare var zc;
@Component({
  selector: 'zc-select',
  templateUrl: './zc-select.component.html',
  styleUrls: ['./zc-select.component.scss']
})
export class ZcSelectComponent extends FieldType implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  to: any;
  isOpenDropdown = false;
  elementClicked: any;
  elementFocused: any;
  defaultOptions = {
    templateOptions: { options: [] }
  };
  optionList: any = [];
  disabledOptions: any = [];
  payload: any = {};
  dataKey = 'uid';
  mode = 'edit';
  constructor(private formFieldService: FormFieldService) {
    super();
  }
  ngOnInit() {
    if (this.to.mode) {
      this.mode = this.to.mode;
    }
    if (
      this.to.dataSource &&
      this.to.dataSource.api &&
      this.to.dataSource.api.map &&
      this.to.dataSource.api.map.value
    ) {
      this.dataKey = this.to.dataSource.api.map.value;
    }
    this.formControl.valueChanges.subscribe(val => {
      if (val && val.uid) {
        this.change({ value: val });
      }
    });
    this.to.search = this.to.search === undefined ? true : this.to.search;
    // console.log('this.mode select');
    if (this.mode !== 'view' && this.to.dataSource && this.to.dataSource.type === 'api') {
      if (
        this.to.dataSource.api.dependents &&
        this.to.dataSource.api.dependents.length > 0
      ) {
        this.getApiPayload(this.to.dataSource.api.dependents);
        if (Object.keys(this.payload).length > 0) {
          this.getOptionsList(
            this.to.dataSource.api.url,
            this.to.dataSource.api.method,
            { dependents: this.payload }
          );
        }

        this.to.dataSource.api.dependents.forEach(dependent => {
          const f = this.field;
          const fieldKeys = {};
          fieldKeys[dependent.name] = null;
          if (this.form.get(dependent.value || dependent.name)) {
            fieldKeys[dependent.name] = this.form.get(dependent.value || dependent.name);
          } else {
            const fieldControl = f.parent.fieldGroup.find(
              field => field.key === dependent.value
            );
            if (fieldControl) {
              fieldKeys[dependent.name] = fieldControl.formControl;
            }
          }

          if (fieldKeys[dependent.name]) {
            fieldKeys[dependent.name].valueChanges.subscribe(
              fieldData => {
                f.formControl.setValue(null);
                this.to.options = [];
                this.getApiPayload(this.to.dataSource.api.dependents);
                if (Object.keys(this.payload).length > 0) {
                  this.getOptionsList(
                    this.to.dataSource.api.url,
                    this.to.dataSource.api.method,
                    { dependents: this.payload }
                  );
                }
              }
            );
          }
          // if (this.form.get(field.value || field.name)) {
          //   this.form.get(field.value || field.name).valueChanges.subscribe(fieldValue => {
          //     this.getApiPayload(this.to.dataSource.api.dependents);
          //     if (Object.keys(this.payload).length > 0) {
          //       this.getOptionsList(this.to.dataSource.api.url, this.to.dataSource.api.method, { dependents: this.payload });
          //     }
          //   });
          // }
        });
      } else {
        this.getOptionsList(
          this.to.dataSource.api.url,
          this.to.dataSource.api.method,
          this.payload
        );
      }
    }
    // this.optionList = this.to.options;
    if (this.to.hiddenValue) {
      this.to.hiddenValue.forEach(field => {
        if (this.form.get(field.name)) {
          this.form
            .get(field.value || field.name)
            .valueChanges.subscribe(fieldValue => {
              this.hiddenValue(this.to.hiddenValue);
            });
        }
      });
    }
  }
  hiddenValue(fields) {
    fields.forEach(field => {
      if (this.form.get(field.name)) {
        this.to.options = this.optionList.filter(
          item => item.uid !== this.form.get(field.name).value.uid
        );
      }
    });
  }

  getApiPayload(fields) {
    let payloadExists: any = false;
    if (fields.length > 0) {
      fields.forEach(field => {
        // const fieldControl = this.form.get(field.value || field.name);
        /**
         *  if (
          fieldControl &&
          fieldControl.value &&
          (typeof fieldControl.value === 'object' &&
            (fieldControl.value.uid || fieldControl.value.length > 0))
        ) {
          this.payload[field.name] = this.form.get(
            field.value || field.name
          ).value;
          payloadExists = true;
        } else {
          this.payload[field.name] = null;
        }
         */
        let fieldControl: any;
        if (this.form.get(field.value || field.name)) {
          fieldControl = this.form.get(field.value || field.name).value;
        } else {
          fieldControl = this.getKeyValue((field.value || field.name), this.field.model);
        }

        // const fieldControl = this.getKeyValue((field.value || field.name), this.field.model);
        if (fieldControl && (typeof fieldControl === 'object' &&
          (fieldControl.uid || fieldControl.length > 0))) {
          this.payload[field.name] = fieldControl;
          payloadExists = true;
        } else {
          this.payload[field.name] = null;
        }
      });
    }
    if (!payloadExists) {
      this.payload = {};
    }
  }

  getOptionsList(url, method, payload) {
    this.formFieldService
      .getOptionsList(url, method, payload)
      .subscribe(result => {
        if (this.to.dataSource.api.map) {
          const options = result.map(res => {
            const valueKey = this.to.dataSource.api.map.value || 'uid';
            const labelKey = this.to.dataSource.api.map.label || 'name';
            // res.uid = res[valueKey];
            // res.name = res[labelKey];
            res.uid = this.getKeyValue(valueKey, res);
            res.name = this.getKeyValue(labelKey, res);
            // res.label = this.getKeyValue(labelKey,res);
            return res;
          });
          this.to.options = options;
          this.optionList = options;
        } else {
          this.to.options = result;
        }
        // this.options = this.to.options;
        if (this.to.dataSource.api && this.to.dataSource.api.onSuccess) {
          this.to.dataSource.api.onSuccess.forEach(action => {
            if (action.type === 'script') {
              try {
                const fun = new Function(
                  'form',
                  'field',
                  'model',
                  'options',
                  action.script
                );
                fun(this.form, this.field, this.model, this.options);

                if (
                  this.formControl.value &&
                  this.formControl.value.length > 0
                ) {
                  this.disabledOptions = [];
                  this.formControl.value.forEach(option => {
                    if (option.disabled) {
                      this.disabledOptions.push(option);
                    }
                  });
                }
              } catch (error) {
                console.log('error', error, action.script);
              }
            }
          });
        }
      });
  }

  change(event) {
    if (this.field.templateOptions.onchange) {
      this.field.templateOptions.onchange(this.field, event, this.form);
    }
  }

  multiSelectChange(event) {
    if (event.itemValue && event.itemValue.disabled) {
      let selectedValues: any = [];
      selectedValues = this.formControl.value;
      selectedValues.push(event.itemValue);
      this.formControl.setValue(selectedValues);
    }
    if (!event.itemValue && !event.value.length) {
      this.formControl.setValue(this.disabledOptions);
    }
    if (this.field.templateOptions.onchange) {
      this.field.templateOptions.onchange(this.field, event, this.form);
    }
  }

  getDisplayValue() {
    if (this.formControl.value && this.formControl.value.label) {
      return this.formControl.value.label;
    } else if (typeof this.formControl.value === 'string') {
      return this.formControl.value;
    } else {
      return '---';
    }
  }

  show(event) {
    // console.log('event', event);
  }

  focus(event) {
    this.elementFocused = true;
    this.openDropdown(event);
  }

  click(event) {
    this.elementClicked = true;
  }

  openDropdown(event) {
    if (!event.path[2].classList.contains('ui-dropdown-open')) {
      if (!this.elementClicked && this.elementFocused) {
        const el: HTMLElement = event.target as HTMLElement;
        el.click();
      }
      this.elementClicked = false;
      this.elementFocused = false;
    }
  }
  getKeyValue(key, item) {
    const colKey = 'item.' + key;
    try {
      const fun = new Function('item', 'return ' + colKey + ' ; ');
      return fun(item);
    } catch (error) {
      console.log('error', colKey, error);
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
