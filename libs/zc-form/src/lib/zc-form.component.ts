import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { ZcFormService } from './zc-form.service';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';

import { ActionService } from '@zc-ui/zc-utilities';
import { FormConfig } from './zc-form.config';
declare var zc;
@Component({
  selector: 'zc-form',
  templateUrl: './zc-form.component.html',
  styleUrls: ['./zc-form.component.scss']
})
export class ZcFormComponent implements OnInit, AfterViewInit {
  @Input() options: FormConfig;
  @Input() form = new FormGroup({});
  @Input() model: any = {};
  @Input() formlyOptions: FormlyFormOptions = {
    formState: {
      submitted: false
    }
  };
  fields: any = [];
  showForm = true;
  //Modal form
  inlineFormOptions: any;
  modal: NgbModalRef;
  @ViewChild('zcFormModal') zcFormModal: any;
  constructor(
    private zcFormService: ZcFormService,
    private actionService: ActionService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.fields = this.zcFormService.formlyFieldsParser(this.options);
    this.formlyOptions.formState.widgetId = this.options.id;
    if (this.options.uid) {
      this.model.uid = this.options.uid;
    }
    if (this.options.params) {
      this.model = { ...this.model, ...this.options.params };
    }
    if (this.options.model) {
      this.model = { ...this.model, ...this.options.model };
    }
    if (
      this.model.uid ||
      (this.options.properties &&
        this.options.properties.preFillApi &&
        !this.options.properties.preFillApi.params)
    ) {
      let payload: any = {};
      if (this.options.properties && this.options.properties.preFillApi) {
        this.showForm = false;
        if (this.options.properties.preFillApi.params) {
          payload = this.actionService.getParams(
            this.options.properties.preFillApi.params,
            this.model
          );
        }
        this.zcFormService
          .getForm(
            this.options.properties.preFillApi.url,
            this.options.properties.preFillApi.method,
            payload
          )
          .subscribe(res => {
            this.showForm = true;
            if (res.data) {
              // this.model = res.data;
              this.model = { ...this.model, ...res.data };
            }
          }, error => {
            console.log('error', error);
            this.showForm = true;
          });
      }
    }
    this.checkFormConditions();
  }
  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    // this.options.component = this;
    if (this.options.id) {
      zc[this.options.id] = this;
    }
  }
  modelChange(data) { }
  checkFormConditions() {
    if (this.options.conditions && this.options.conditions.title) {
      const title = this.formTitleCondition(this.options.conditions.title);
      if (title) {
        this.options.title = title;
      }
    }
  }
  formTitleCondition(condition) {
    try {
      const script = this.zcFormService.appendFormModel(condition, 'model.');
      const fun = new Function('model', 'return ' + script + ';');
      return fun(this.model);
    } catch (error) {
      console.log('error', error, condition);
    }
  }
  submit(arg?: any) {
    return this.model;
  }
  resetModel(data) {
    console.log('data', data.data);
    this.model = { ...this.model, ...data.data };
    // if (data.data) {
    //   Object.keys(data.data).forEach(key => {
    //     console.log('key',key);
    //     this.model[key] = data.data[key];
    //   });
    // }
    
    // console.log('this.model', this.model);
  }
  reset() {
    this.formlyOptions.formState.submitted = false;
    if (zc[this.options.id + '_ref']) {
      console.log('this.options', zc[this.options.id + '_ref']);
      this.options.title = zc[this.options.id + '_ref'].options.title;
    }
    this.model = {};
    this.formlyOptions.resetModel();
  }
  afterSubmit() {
    if (this.options.properties.afterSubmit) {
      const fun = new Function(this.options.properties.afterSubmit);
      fun();
    }
  }
  reload() {
    this.ngOnInit();
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
}
