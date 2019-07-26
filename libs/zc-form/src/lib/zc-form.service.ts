import { Injectable } from '@angular/core';
import { AppHttpClient } from '@zc-ui/zc-utilities';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormConfig, Field } from './zc-form.config';
import { map } from 'rxjs/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ZcFormService {
  formlyFields: any = [];
  groupField: any;
  mode: any;
  fieldGroupFindField: any;
  constructor(private http: AppHttpClient) { }
  formlyFieldsParser(options: FormConfig) {
    this.formlyFields = [];
    if (options.mode) {
      this.mode = options.mode;
    } else {
      this.mode = null;
    }
    this.getFormlyFormat(options.fields, this.formlyFields);
    return this.formlyFields;
  }
  getFormlyFormat(fields: Field[], formlyFields) {
    if (fields && fields.length > 0) {
      fields.forEach(field => {
        if (field.fieldItems && field.fieldItems.length) {
          const groupField: any = this.getFormlyField(field);
          groupField.fieldGroup = [];
          this.getFormlyFormat(field.fieldItems, groupField.fieldGroup);
          formlyFields.push(groupField);
        } else {
          formlyFields.push(this.getFormlyField(field));
        }
      });
    }

  }

  getFormlyField(field: Field) {
    if (!field.properties) {
      field.properties = {};
    }
    const formlyField: FormlyFieldConfig = {};
    if (field.containerClass) {
      formlyField.fieldGroupClassName = field.containerClass;
    }

    formlyField.templateOptions = {};
    formlyField.templateOptions = Object.assign({}, field.properties);
    if (this.mode) {
      formlyField.templateOptions.mode = field.properties.mode
        ? field.properties.mode
        : this.mode;
    }
    /*  formlyField.dataSource = {};
     formlyField.dataSource = Object.assign({}, field.dataSource); */

    if (field.type) {
      if (field.type === 'choose' || field.type === 'relation') {
        if (field.properties.displayStyle) {
          formlyField.type = field.properties.displayStyle;
        } else {
          formlyField.type = 'select';
        }
      } else {
        formlyField.type = field.type;
      }

      if (field.type === 'date' || field.type === 'datetime') {
        if (field.properties.maxDate) {
          const maxDate: any = new Date();
          maxDate.setDate(maxDate.getDate());
          field.properties.maxDate = field.properties.maxDate.match('current_date') ? field.properties.maxDate.replace('current_date', maxDate.getDate()) : maxDate.getDate();
          const fun = new Function('maxDate', 'return ' + field.properties.maxDate + ' ; ');
          maxDate.setDate(fun(maxDate));
          formlyField.templateOptions.maxDate = maxDate;
        }
        if (field.properties.minDate) {
          const minDate: any = new Date();
          minDate.setDate(minDate.getDate());
          field.properties.minDate = field.properties.minDate.match('current_date') ? field.properties.minDate.replace('current_date', minDate.getDate()) : minDate.getDate();
          const fun = new Function('minDate', 'return ' + field.properties.minDate + ' ; ');
          minDate.setDate(fun(minDate));
          formlyField.templateOptions.minDate = minDate;
          // formlyField.defaultValue = minDate;
        }
      }
    }
    if (field.name) {
      formlyField.key = field.name;
      formlyField.templateOptions.name = field.name;
    }
    if (field.fieldClass) {
      formlyField.className = field.fieldClass;
    }
    if (field.label) {
      formlyField.templateOptions.label = field.label;
    }
    if (field.id) {
      formlyField.templateOptions.id = field.id;
    }
    if (field.template) {
      formlyField.template = field.template;
    }
    if (field.conditions) {
      const conditionsKeys = Object.keys(field.conditions);
      const expressionProperties = {};
      conditionsKeys.forEach(conditionsKey => {
        switch (conditionsKey) {
          case 'hidden':
            formlyField.hideExpression = this.appendFormModel(
              field.conditions.hidden,
              'model.'
            );
            break;
          case 'hiddenValue':
            formlyField.templateOptions.hiddenValue =
              field.conditions.hiddenValue;
            break;
          default:
            const templateOptionsKey = 'templateOptions.' + conditionsKey;
            expressionProperties[templateOptionsKey] = this.appendFormModel(
              field.conditions[conditionsKey],
              'model.'
            );
            break;
        }
      });
      formlyField.expressionProperties = expressionProperties;
    }

    // if (field.conditions) {
    //   if (field.conditions.hidden) {
    //     formlyField.hideExpression = this.appendFormModel(field.conditions.hidden, 'model.');
    //   }
    //   if (field.conditions.disabled) {
    //     formlyField.expressionProperties = {
    //       'templateOptions.disabled': this.appendFormModel(field.conditions.disabled, 'model.')
    //     }
    //   }
    //   if (field.conditions.required) {
    //     formlyField.expressionProperties = {
    //       'templateOptions.required': this.appendFormModel(field.conditions.required, 'model.')
    //     }
    //   }
    //   if (field.conditions.readonly) {
    //     formlyField.expressionProperties = {
    //       'templateOptions.readonly': this.appendFormModel(field.conditions.readonly, 'model.')
    //     }
    //   }
    //   if (field.conditions.hiddenValue) {
    //     formlyField.templateOptions.hiddenValue = field.conditions.hiddenValue;
    //   }

    // }

    if (field.dataSource) {
      formlyField.templateOptions.dataSource = field.dataSource;
      formlyField.templateOptions.options = field.dataSource.options;
    }
    if (field.properties && field.properties.messages) {
      const messages: any = {};
      Object.assign(messages, field.properties.messages);
      formlyField.validation = {
        messages: messages
      };
    }
    if (field.properties.hidden) {
      formlyField.hide = field.properties.hidden;
    }
    /* if (field.properties && field.properties.displayStyle) {
      console.log('field', field);
      field.type = field.properties.displayStyle;
    } */
    if (field.cols) {
      formlyField.templateOptions.cols = field.cols;
    }
    if (field.footer) {
      formlyField.templateOptions.footerRows = field.footer;
    }
    if (field.actions) {
      formlyField.templateOptions.actions = field.actions;
    }
    if (field.action) {
      formlyField.templateOptions.action = field.action;
    }
    if (field.defaultValue) {
      formlyField.defaultValue = field.defaultValue;
    }
    if (field.events) {
      Object.keys(field.events).forEach(eventName => {
        if (eventName === 'onload') {
          formlyField.hooks = {
            onInit: f => {
              if (field.events[eventName].conditions) {
                this.getFormFieldValue(field.events[eventName].conditions, f);
                this.getFormFieldValueByValueChange(
                  f.form,
                  field.events[eventName].conditions,
                  f
                );
              }
              if (field.events[eventName].script) {
                try {
                  const fun = new Function(
                    'form',
                    'field',
                    'model',
                    'options',
                    field.events[eventName].script
                  );
                  fun(f.form, f, f.model, f.options);
                } catch (error) {
                  console.log('error', error, field.events[eventName].script);
                }
              }
            }
          };
        } else {
          formlyField.templateOptions[eventName] = (
            currentField,
            event,
            form?: any
          ) => {
            if (field.events[eventName].api) {
              let payload: any = {};
              payload = event.value;
              this.getApiData(
                field.events[eventName].api.url,
                field.events[eventName].api.method,
                payload
              ).subscribe(res => {
                const result: any = res.data;
                if (field.events[eventName].api.fields) {
                  let prefillField: any;
                  let prefillFieldValue: any;
                  field.events[eventName].api.fields.forEach(mapField => {
                    prefillField = currentField.parent.fieldGroup.find(
                      item => item.key === mapField.name //getKeyValue
                    );
                    prefillFieldValue = this.getKeyValue(mapField.value, result);
                    if (prefillField && prefillFieldValue) {
                      prefillField.formControl.setValue(prefillFieldValue);
                    }
                    // if (prefillField && result[mapField.value]) {
                    //   prefillField.formControl.setValue(result[mapField.value]);
                    // }
                  });
                }
              });

              // field.events[eventName].api.dependents.forEach(dependent => {
              //   payload = this.getApiPayload(field.events[eventName].api.dependents, form);
              //   this.getApiData(field.events[eventName].api.url, field.events[eventName].api.method, { dependents: payload }).subscribe(res => {
              //     if (field.events[eventName].api.field) {
              //       const result: any = res.data.listData.rows;
              //       if (field.events[eventName].api.field.cols) {
              //         const rows: any = [];
              //         result.forEach(item => {
              //           const currentRow: any = {};
              //           field.events[eventName].api.field.cols.forEach(col => {
              //             currentRow[col.name] = null;
              //             if (col.name === field.events[eventName].api.map.name) {
              //               if (col.type === 'text') {
              //                 currentRow[col.name] = item.name;
              //               }
              //               else {
              //                 currentRow[col.name] = item;
              //               }
              //             }
              //           });
              //           rows.push(currentRow);
              //         });
              //          currentField.formControl.parent.parent.controls['prod_house'].controls['documents'].setValue(rows);
              //       }
              //     }
              //   });
              // });
            }
            if (field.events[eventName].script) {
              try {
                const fun = new Function(
                  'form',
                  'field',
                  'event',
                  'model',
                  field.events[eventName].script
                );
                fun(form, currentField, event, currentField.model);
              } catch (error) {
                console.log('error', error, field.events[eventName].script);
              }
            }
          };
        }
      });
    }
    return formlyField;
  }

  getApiPayload(fields, form) {
    const payload: any = {};
    if (fields.length > 0) {
      fields.forEach(field => {
        if (
          form.get(field.value || field.name) &&
          form.get(field.value || field.name).value
        ) {
          payload[field.name] = form.get(field.value || field.name).value;
        } else {
          payload[field.name] = null;
          // this.payload = {};
          // return false;
        }
      });
    }
    return payload;
  }
  getApiData(url: string, method: string, payload: any) {
    let result: any = {};
    if (method === 'post') {
      result = this.http.post(url, payload).pipe(map(res => <any>res));
    } else {
      result = this.http.get(url).pipe(map(res => <any>res));
    }
    return result;
  }
  getFormFieldValue(conditions, currentField) {
    console.log('value changed');
    const formModel = JSON.parse(JSON.stringify(currentField.model));
    conditions.forEach(condition => {
      if (condition.fields) {
        condition.fields.forEach(field => {
          // if (formModel.hasOwnProperty(field.name)) {
          if (field.type === 'number' || field.type === 'percentage') {
            if (!formModel[field.name]) {
              formModel[field.name] = 0;
            }
          }
          // }
          let resultVal: any = 0;
          const fieldExpressionVal: Boolean = true;

          if (fieldExpressionVal && condition.value) {
            try {
              const fieldValue = this.appendFormModel(
                condition.value,
                'formModel'
              );
              const fieldFun = new Function(
                'formModel',
                'return ' + fieldValue + ' ; '
              );
              resultVal = fieldFun(formModel);
              if (this.isFloat(resultVal)) {
                resultVal = parseFloat(resultVal.toFixed(2));
              }
            } catch (error) {
              resultVal = 0;
            }
          }
          if (
            (resultVal || resultVal === 0) &&
            fieldExpressionVal &&
            condition.value
          ) {
            if (currentField.model[currentField.key] !== resultVal) {

              currentField.formControl.setValue(resultVal);
              // if (currentField.formControl.parent.controls[currentField.key]) {
              //   currentField.formControl.parent.controls[
              //     currentField.key
              //   ].setValue(resultVal);
              // } else {
              //   currentField.model[currentField.key] = resultVal;
              // }
            }
          }
        });
      }
    });
  }
  getKeyValue(key, value) {
    try {
      const colKey = 'value.' + key;
      const fun = new Function('value', 'return ' + colKey + ' ; ');
      return fun(value);
    } catch (error) {
      console.log('key', key);
    }

  }
  getFieldInFieldGroup(fields, fieldName) {
    fields.forEach(currentField => {
      if (currentField.fieldGroup && currentField.fieldGroup.length > 0) {
        this.getFieldInFieldGroup(currentField.fieldGroup, fieldName);
      } else {
        if (currentField.key === fieldName) {
          this.fieldGroupFindField = currentField;
          console.log('currentField -->', currentField);
          // return currentField;

        }

      }
    });
  }
  getFormFieldValueByValueChange(form, conditions, currentField) {
    conditions.forEach(condition => {
      if (condition.fields) {
        condition.fields.forEach(field => {
          this.fieldGroupFindField = null;
          if (currentField.name !== field.name) {
            if (form.get(field.name)) {
              form.get(field.name).valueChanges.subscribe(val => {
                this.getFormFieldValue(conditions, currentField);
              });
            } else {
              const f = currentField;
              const fieldKeys = {};
              this.getFieldInFieldGroup(f.parent.fieldGroup, field.name);
              fieldKeys[field.name] = this.fieldGroupFindField;
              console.log('fieldKeys[field.name] -->', fieldKeys);
              fieldKeys[field.name].formControl.valueChanges.subscribe(val => {
                this.getFormFieldValue(conditions, currentField);
              });

            }
          }
        });
      } else {
        // form.valueChanges.subscribe(val => {
        //   console.log('Form values changed', val);
        //   this.getFormFieldValue(conditions, currentField);
        // });
      }
    });
  }
  // expressionFormate(condition) {
  //   condition = condition.replace(/\$/g, 'model');
  //   condition = condition.replace(/\[/g, "['");
  //   condition = condition.replace(/\]/g, "']");
  //   return condition;
  // }
  appendFormModel(condition, formModel) {
    try {
      condition = condition.replace(/\$/g, formModel);
      condition = condition.replace(/\[/g, "['");
      condition = condition.replace(/\]/g, "']");
      return condition;
    } catch (error) {
      console.log('condition', condition);
    }
  }
  isFloat(x) {
    return !!(x % 1);
  }
  getForm(url, method = 'post', payload: any) {
    return this.http.request(method, url, payload);
  }
  saveForm(url, payload) {
    return this.http.post(url, payload);
  }
  updateForm(url, payload) {
    return this.http.put(url, payload);
  }
}
