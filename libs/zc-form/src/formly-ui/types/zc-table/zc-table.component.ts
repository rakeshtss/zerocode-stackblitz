import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActionService } from '@zc-ui/zc-utilities';
import { FormFieldService } from '../../services/form-field.service';
import { AppConfigService } from '@zc-ui/zc-utilities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
declare var zc;
@Component({
  selector: 'zc-zc-table',
  templateUrl: './zc-table.component.html',
  styleUrls: ['./zc-table.component.scss'],
  providers:[CurrencyPipe]
})
export class ZcTableComponent extends FieldType
  implements OnInit, AfterViewInit {
  to: any;
  cols: any;
  footerRows = [];
  rows: any[] = [];
  actions: any;
  newRecord = false;
  showtable = true;
  editRowIndex: any;
  payload: any = {};
  baseUrl: any;
  //modal
  inlineFormOptions: any;
  modal: NgbModalRef;
  @ViewChild('zcFormModal') zcFormModal: any;
  constructor(
    private modalService: NgbModal,
    private actionService: ActionService,
    private formFieldService: FormFieldService,
    private appConfigService: AppConfigService,
    private http: HttpClient,
    private currencyPipe: CurrencyPipe
  ) {
    super();
  }

  ngOnInit() {
    this.baseUrl = this.appConfigService.settings.fileServer;
    this.cols = this.to.cols;
    if (this.to.footerRows && this.to.footerRows.length > 0) {
      this.footerRows = this.to.footerRows;
    }
    this.actions = this.to.actions;

    if (!this.formControl.value) {
      this.formControl.setValue([]);
    }
    this.rows = this.formControl.value;

    this.formControl.valueChanges.subscribe(val => {
      console.log('table field value changes', val);
      if (val) {
        this.rows = val;
      } else {
        this.rows = [];
      }
      let isRequired = false;
      this.rows.forEach(row => {
        if(!isRequired) {
          this.cols.forEach(col => {
            if (col.properties && col.properties.required) {
              if (row[col.name] && row[col.name].length > 0) {
                this.formControl.setErrors(null);
              } else {
                console.log('file required', row[col.name]);
                this.formControl.setErrors({
                  'server-error': col.properties.messages.required
                    ? col.properties.messages.required
                    : 'All required'
                });
                isRequired = true;
              }
            }
          });
        }
      });

      console.log('form control value', this.formControl);
    });

    if (this.to.dataSource && this.to.dataSource.type === 'api') {
      if (this.to.dataSource.api.dependents && this.to.dataSource.api.dependents.length > 0) {
        console.log('this.to.dataSource.api.dependents -->', this.to.dataSource.api.dependents);
        this.to.dataSource.api.dependents.forEach(dependent => {
          const f = this.field;
          const fieldKeys = {};
          fieldKeys[dependent.name] = f.parent.fieldGroup.find(
            field => field.key === dependent.value
          );
          console.log('filed keys', f.key, dependent.name, fieldKeys);
          if (fieldKeys[dependent.name]) {
            fieldKeys[dependent.name].formControl.valueChanges.subscribe(
              fieldData => {
                this.getApiPayload(this.to.dataSource.api.dependents);
                
                if (Object.keys(this.payload).length > 0) {
                  this.getRows(
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
          //     if (Object.keys(this.payload).length) {
          //       this.getRows(
          //         this.to.dataSource.api.url,
          //         this.to.dataSource.api.method,
          //         { dependents: this.payload }
          //       );
          //     }
          //   });
          // }
        });
      } else {
        if (!this.model.uid) {
          this.getRows(
            this.to.dataSource.api.url,
            this.to.dataSource.api.method,
            this.payload
          );
        }
      }
    }
    // console.log('value', this.value);
    // console.log('actions', this.actions);
  }
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    // this.options.component = this;
    if (this.field.key) {
      zc[this.field.key] = this;
    }
  }

  openModal(action, content) {
    this.actionService.action(
      action,
      this.model,
      { id: this.field.key, type: 'formBtn' }
    );
  }
  open(type = 'inline') {
    // this.inlineForm = !this.inlineForm;
    if (type === 'inline') {
    } else if (type === 'modal') {
      // backdrop: 'static'
      this.modal = this.modalService.open(this.zcFormModal, {
        size: 'lg',
        centered: true
      });
    }
  }
  close(type = 'modal') {
    if (this.modal) {
      this.modal.dismiss();
    }
  }
  edit(action, row, index) {
    this.editRowIndex = index;
    this.actionService.action(action, row, {
      id: this.field.key,
      type: 'formBtn'
    });
  }
  delete(index) {
    this.rows.splice(index, 1);
    this.formControl.setValue(this.rows);
  }
  // depreciated current method added new method addRow
  addFormData(data) {
    zc[data.formId].formlyOptions.formState.submitted = true;
    if (zc[data.formId].form.valid) {
      if (data.type === 'update') {
        this.rows[this.editRowIndex] = zc[data.formId].model;
      } else {
        this.rows.push(zc[data.formId].model);
      }
      this.close();
    }
    this.formControl.setValue(this.rows);
  }

  addRow(data) {
    zc[data.formId].formlyOptions.formState.submitted = true;
    if (zc[data.formId].form.valid) {
      this.rows.push(zc[data.formId].model);
      this.close();
    }
    this.formControl.setValue(this.rows);
  }

  updateRow(data) {
    zc[data.formId].formlyOptions.formState.submitted = true;
    if (zc[data.formId].form.valid) {
      this.rows[this.editRowIndex] = zc[data.formId].model;
      this.close();
    }
    this.formControl.setValue(this.rows);
  }

  addNewRecord() {
    this.newRecord = true;
    if (
      this.actions.group.add.component.type === 'inline' &&
      this.actions.group.add.component.hideParent
    ) {
      this.showtable = false;
    }
  }

  detectFile(files: FileList, rowIndex, col) {
    this.uploadFile(files, this.baseUrl + 'upload/').subscribe(
      res => {
        this.rows[rowIndex][col] = [res.data];
        this.formControl.setValue(this.rows);
      },
      error => { }
    );
  }

  detectInlineValue(event, rowIndex, col) {
    console.log('detectInlineValue event', event.target.value);
    console.log('this.rows', this.rows);
    if(col.unique && col.type === 'radio') {
      this.rows.forEach((item,itemIndex)  => {
        this.rows[itemIndex][col.name] = "false";
      });
    }
    if(event && event.target) {
      if(event.target.value === '' && col.type === 'number') {
        this.rows[rowIndex][col.name] = null;
      } else {
        this.rows[rowIndex][col.name] = event.target.value;
      }
      this.formControl.setValue(this.rows);
      console.log('this.rows1', this.rows);
    }
  }

  uploadFile(files, url): Observable<any> {
    const formData: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }

    return this.http.post(url, formData);
  }

  handleFileInput(files: FileList, rowIndex, col) {
    console.log('table field file ->', files);
    const myReader: FileReader = new FileReader();
    for (let i = 0; i < files.length; i++) {
      myReader.readAsDataURL(files[i]);
      // list.push();
    }
    myReader.onloadend = e => {
      // this.formControl.setValue({name: files[0]['name'], data: myReader.result});
      this.rows[rowIndex][col] = [
        { name: files[0]['name'], data: myReader.result }
      ];
    };
  }
  remove(rowIndex, col) {
    this.rows[rowIndex][col] = [];
    // this.form.markAsDirty();
    // this.form.markAsTouched();
    this.formControl.setValue(this.rows);
  }
  getApiPayload(fields) {
    if (fields.length > 0) {
      fields.forEach(field => {
        if (
          this.form.get(field.value || field.name) &&
          this.form.get(field.value || field.name).value
        ) {
          this.payload[field.name] = this.form.get(
            field.value || field.name
          ).value;
        } else {
          this.payload[field.name] = null;
          // this.payload = {};
          // return false;
        }
      });
    }
  }
  getRows(url, method, payload) {
    if(this.to.dataSource.api && this.to.dataSource.api.params && this.to.dataSource.api.params.length > 0) {
      this.to.dataSource.api.params.forEach(param => {
        if(param.type === 'string') {
          payload[param.name] = param.value;
        }
      });
    }
    this.formFieldService
      .getOptionsList(url, method, payload)
      .subscribe(result => {
        this.rows = [];
        // console.log('file upload documents', result);
        result.forEach(item => {
          let currentRow: any = {};
          if(this.to.dataSource.api.map) {
            this.cols.forEach(col => {
              currentRow[col.name] = null;
              if (col.name === this.to.dataSource.api.map.name) {
                if (col.type === 'text') {
                  currentRow[col.name] = item.name; // change to item to item.name
                } else {
                  currentRow[col.name] = item;
                }
              }
            });
          } else {
            currentRow = item;
          }
          this.rows.push(currentRow);
        });
        this.formControl.setValue(this.rows);
      });
  }
  sum(col) {
    let total = 0;
    this.formControl.value.forEach(item => {
      if (item && item[col.name]) {
        if (item[col.name] && !isNaN(item[col.name])) {
          total = total + +item[col.name];
        }
      }
    });
    return total;
  }
  count(col) {
    return this.formControl.value.length;
  }
  findExpressionValue(col) {
    if (col.type === 'label') {
      if (col.label) {
        return col.label;
      } else {
        return '';
      }
    } else {
      let fieldValue = 0;
      let fieldExpression = col.expression;
      this.cols.forEach(colInfo => {
        const colSum = 'sum('+colInfo.name+')';
        const colCount = 'count('+colInfo.name+')';
        fieldExpression = fieldExpression.includes(colSum) ? fieldExpression.replace(colSum, this.sum(colInfo)) : fieldExpression;
        fieldExpression = fieldExpression.includes(colCount) ? fieldExpression.replace(colCount, this.count(colInfo)) : fieldExpression;
      });
      const fun = new Function('return ' + fieldExpression + ' ; ');
      fieldValue = fun(fieldExpression);
      let currencyCode = 'INR';
      if(col.displayType && col.displayType === 'number') {
        return fieldValue;
      }
      if(col.currency) {
        currencyCode = col.currency;
      }
      return this.currencyPipe.transform(fieldValue, (currencyCode) ? currencyCode : null, ' ');
      return fieldValue;
    }
  }
}
