import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'zc-boolean',
  templateUrl: './zc-boolean.component.html',
  styleUrls: ['./zc-boolean.component.scss']
})
export class ZcBooleanComponent extends FieldType implements OnInit {
  to: any;
  constructor() {
    super();
  }
  ngOnInit() {
    this.formControl.valueChanges.subscribe(val => {
      if (val) {
        // console.log('Boolean', val);
      }
    });
  }
}
