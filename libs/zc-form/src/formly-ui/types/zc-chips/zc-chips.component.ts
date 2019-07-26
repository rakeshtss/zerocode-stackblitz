import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'zc-zc-chips',
  templateUrl: './zc-chips.component.html',
  styleUrls: ['./zc-chips.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ZcChipsComponent extends FieldType implements OnInit {
  ngOnInit() {}
}
