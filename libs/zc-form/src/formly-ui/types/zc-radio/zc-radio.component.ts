import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormFieldService } from '../../services/form-field.service';

@Component({
  selector: 'zc-radio',
  templateUrl: './zc-radio.component.html',
  styleUrls: ['./zc-radio.component.scss']
})
export class ZcRadioComponent extends FieldType implements OnInit {
  to: any;
  defaultOptions = {
    templateOptions: { options: [] }
  };
  mode = 'edit';
  constructor(private formFieldService: FormFieldService) {
    super();
  }

  ngOnInit() {
    if(this.to.mode) {
      this.mode = this.to.mode;
    }
    this.to.search = this.to.search === undefined ? true : this.to.search;
    if (this.mode !== 'view' && this.to.dataSource && this.to.dataSource.type === 'api') {
      this.formFieldService
        .getOptionsList(
          this.to.dataSource.api.url,
          this.to.dataSource.api.method,
          {}
        )
        .subscribe(result => {
          if (this.to.dataSource.api.map) {
            const options = result.map(res => {
              const valueKey = this.to.dataSource.api.map.value || 'uid';
              const labelKey = this.to.dataSource.api.map.label || 'name';
              res.uid = res[valueKey];
              res.name = res[labelKey];
              return res;
            });
            this.to.options = options;
            if (
              this.to.dataSource.api.hiddenValue &&
              this.to.dataSource.api.hiddenValue.length > 0
            ) {
              this.to.dataSource.api.hiddenValue.forEach(value => {
                if (value.uid) {
                  this.to.options = this.to.options.filter(
                    item => item.uid !== value.uid
                  );
                }
              });
            }
          } else {
            this.to.options = result;
          }
        });
    }
  }
}
