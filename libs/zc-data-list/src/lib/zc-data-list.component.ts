import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  ViewChild,
  AfterContentInit
} from '@angular/core';
import { ZcDataListConfig } from './zc-data-list-config';
import { ZcDataListTableComponent } from './zc-data-list-table/zc-data-list-table.component';
declare var zc;
@Component({
  selector: 'zc-data-list',
  templateUrl: './zc-data-list.component.html',
  styles: []
})
export class ZcDataListComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  @Input() options: ZcDataListConfig;
  @ViewChild(ZcDataListTableComponent) table: ZcDataListTableComponent;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    zc[this.options.id] = this;
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    zc[this.options.id] = this;
  }
  open(type) {
    this.table.open(type);
  }
  close() {
    this.table.close();
  }
  reload() {
    this.table.reload();
  }
}
