import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormFieldService } from '../../services/form-field.service';

@Component({
  selector: 'zc-checkbox',
  templateUrl: './zc-checkbox.component.html',
  styleUrls: ['./zc-checkbox.component.scss']
})
export class ZcCheckboxComponent extends FieldType implements OnInit {
  to: any;
  defaultOptions = {
    templateOptions: {
      indeterminate: false,
      hideLabel: true
    }
  };
  constructor(private formFieldService: FormFieldService) {
    super();
  }

  ngOnInit() {
    this.to.search = this.to.search === undefined ? true : this.to.search;
    if (this.to.dataSource && this.to.dataSource.type === 'api') {
      this.formFieldService
        .getOptionsList(
          this.to.dataSource.api.url,
          this.to.dataSource.api.method,
          {}
        )
        .subscribe(result => {
          // console.log('Options List', result);
          if (this.to.dataSource.api.map) {
            const options = result.map(res => {
              const valueKey = this.to.dataSource.api.map.value || 'uid';
              const labelKey = this.to.dataSource.api.map.label || 'name';
              res.uid = res[valueKey];
              res.name = res[labelKey];
              return res;
            });
            this.to.options = options;
          } else {
            this.to.options = result;
          }
        });
    }
  }

  checkboxClick(checkedItem) {
    const _value = this.formControl.value || [];
    const itemIndex = this.findSelectionIndex(checkedItem);
    if (itemIndex === -1) {
      _value.push(checkedItem);
    } else {
      _value.splice(itemIndex, 1);
    }
    this.formControl.setValue(_value);
  }
  isSelected(value) {
    return this.findSelectionIndex(value) !== -1;
  }
  findSelectionIndex(val: any): number {
    let index = -1;
    if (this.formControl && this.formControl.value) {
      for (let i = 0; i < this.formControl.value.length; i++) {
        index = -1;
        if (this.formControl.value[i]['uid'] === val.uid) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
}
