import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { StepFormConfig, DefaultOptions, Step } from '../zc-step-form.config';
import { FormGroup, FormArray } from '@angular/forms';
import { FormlyFormOptions } from '@ngx-formly/core';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { ActionService, AppHttpClient } from '@zc-ui/zc-utilities';
declare var zc;
@Component({
  selector: 'zc-step-form',
  templateUrl: './zc-step-form.component.html',
  styleUrls: ['./zc-step-form.component.scss']
})
export class ZcStepFormComponent implements OnInit, AfterViewInit {
  @Input() options: StepFormConfig;
  @ViewChild('stepper') stepper: MatStepper;
  selectedIndex: number;
  showForm = false;
  showNavigator = true;
  form: FormArray;
  formlyOptions: FormlyFormOptions[];
  model: any = {};
  formMode = 'edit';
  steps: Array<Step>;
  selectedTabIndex = 0;
  constructor(
    private actionService: ActionService,
    private http: AppHttpClient
  ) { }

  ngOnInit() {
    this.options = { ...DefaultOptions, ...this.options };
    if (this.options.mode) {
      this.formMode = this.options.mode;
    }
    this.options.properties = {
      ...DefaultOptions.properties,
      ...this.options.properties
    };
    this.form = new FormArray(this.options.steps.map(() => new FormGroup({})));
    this.steps = this.options.steps.map((step, index) => {
      step.id = index;
      return step;
    });
    this.formlyOptions = this.options.steps.map(
      () =>
        <FormlyFormOptions>{
          formState: {
            submitted: false
          }
        }
    );

    this.checkConditions();
    this.showForm = true;
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
        if (this.options.properties.preFillApi.params) {
          payload = this.actionService.getParams(
            this.options.properties.preFillApi.params,
            this.model
          );
        }
        this.showForm = false;
        this.http
          .request(
            this.options.properties.preFillApi.method,
            this.options.properties.preFillApi.url,
            payload
          )
          .subscribe(res => {
            if (res.data) {
              if (Object.keys(res.data).length > 0) {
                this.model = res.data;
              }
            }
            this.showForm = true;
          });
      }
    }

    this.form.valueChanges.subscribe(res => {
      this.checkConditions();
      if (
        this.options.properties.displayStyle === 'tab' &&
        this.options.properties.isLinear
      ) {
        let invalid = true;
        this.steps.map((step, index) => {
          step.disabled = true;
          if (index === 0) {
            step.disabled = false;
          } else {
            if (invalid) {
              if (this.form.at(this.steps[index - 1].id).valid) {
                step.disabled = false;
              } else {
                invalid = false;
              }
            }
          }

          return step;
        });
      }
    });
  }

  ngAfterViewInit(): void {
    zc[this.options.id] = this;
  }
  /**
   * @description goto next step
   * @date 2019-02-15
   */
  next() {
    let _selectedIndex: any;
    if (this.options.properties.displayStyle === 'tab') {
      _selectedIndex = this.selectedTabIndex;
    } else {
      _selectedIndex = this.stepper.selectedIndex;
    }
    const stepId = this.steps[_selectedIndex].id;
    this.formlyOptions[stepId].formState.submitted = true;
    if (this.form.at(stepId).valid) {
      if (this.options.properties.displayStyle === 'tab') {
        this.selectedTabIndex++;
      } else {
        this.stepper.next();
      }
    }
  }

  /**
   * @description goto previous step
   * @date 2019-02-15
   */
  previous() {
    // console.log('this.stepper', this.stepper.selectedIndex);
    if (this.options.properties.displayStyle === 'tab') {
      this.selectedTabIndex--;
    } else {
      this.stepper.previous();
    }
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2019-02-15
   * @param number index
   */
  goto(index) {
    // this.stepper.selectedIndex = 2;
    // this.selectedIndex = index;
  }
  checkConditions() {
    this.steps = this.options.steps.filter((step, index) => {
      let hidden = false;
      if (step.conditions && step.conditions.hidden) {
        try {
          const fun = new Function(
            'model',
            'return ' + this.appendFormModel(step.conditions.hidden)
          );
          const result = fun(this.model);
          if (result) {
            this.form.controls[step.id] = new FormGroup({});
            hidden = result;
          } else {
            hidden = false;
          }
        } catch (error) {
          hidden = true;
          this.form.controls[step.id] = new FormGroup({});
        }
      }
      if (!hidden) {
        return step;
      }
    });
  }
  appendFormModel(condition) {
    condition = condition.replace(/\$/g, 'model.');
    condition = condition.replace(/\[/g, "['");
    condition = condition.replace(/\]/g, "']");
    return condition;
  }

  /**
   * @description
   * @date 2019-02-15
   * @param object arg
   * @returns object
   */
  submit(arg) {
    this.formlyOptions.forEach(opt => {
      opt.formState.submitted = true;
    });

    return this.model;
  }
  reset() {
    const stepId = this.steps[this.stepper.selectedIndex].id;
    this.model = {};
    this.formlyOptions[stepId].resetModel();
  }
  resetModel(data) {
    this.model = { ...this.model, ...data.data };
    // if (data.data) {
    //   Object.keys(data.data).forEach(key => {
    //     console.log('key',key);
    //     this.model[key] = data.data[key];
    //   });
    // }
    console.log('this.model', this.model);
  }
}
