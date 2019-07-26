import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { HttpClient } from '@angular/common/http';
import { FormFieldService } from '../../services/form-field.service';

@Component({
  selector: 'zc-autocomplete',
  templateUrl: './zc-autocomplete.component.html',
  styleUrls: ['./zc-autocomplete.component.scss']
})
export class ZcAutocompleteComponent extends FieldType implements OnInit {
  to: any;
  columns: any[];
  item: any;
  rows: any = [];
  constructor(
    private http: HttpClient,
    private formFieldService: FormFieldService
  ) {
    super();
  }

  ngOnInit() {
    this.columns = [
      {
        type: 'text',
        field: 'name',
        color: 'red'
      }
    ];
  }

  search(event) {
    const payload: any = {};
    payload.globalFilter = event.query;
    payload.select = true;
    /* if (this.to.data.dependent) {
      payload.conditions = {};
      payload.conditions[this.to.data.dependent] = (this.formControl.parent.get(this.to.data.dependent).value) ?
        this.formControl.parent.get(this.to.data.dependent).value : null;
    } */

    /* this.to.http.post(this.to.baseUrl + this.to.data.apiUrl, payload).subscribe(res => {
      const result: any = res;
      this.rows = result.data;
    }); */
    if (this.to.dataSource.type === 'api') {
      this.formFieldService
        .getOptionsList(
          this.to.dataSource.api.url,
          this.to.dataSource.api.method
        )
        .subscribe(result => {
          this.rows = result;
        });
    }
  }
  // blur(event) {
  //     console.log('blur -->', event);
  // }
  change(event) {
    this.form.patchValue(event.other);
    if (this.field.templateOptions.change) {
      this.field.templateOptions.change(this.field, event);
    }
  }
}
