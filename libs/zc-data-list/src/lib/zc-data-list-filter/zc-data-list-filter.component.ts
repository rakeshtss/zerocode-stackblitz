import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'zc-data-list-filter',
  templateUrl: './zc-data-list-filter.component.html',
  styleUrls: ['./zc-data-list-filter.component.scss']
})
export class ZcDataListFilterComponent implements OnInit {
  @Input() dt: any;
  @Input() cols: any;
  @Input() options: any;
  @Input() column: any; // if filterType = column
  @Input() filterType = 'advanced'; // column  advanced
  @ViewChild('emptySearchErrorMsgModal') emptySearchErrorMsgModal: ElementRef;
  showCols: any;
  rangeDates: any;
  filtersList: any = [];
  filteredColumns: any = [];
  rangeValues: number[] = [];
  filterButtonPossion: string; // bottom top both
  enableSearch = false;
  emptySearchErrorMsg = 'Please search in any of search fields.';
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (this.cols) {
      this.showCols = this.cols.filter(col => {
        if (col['filter'] && col['filter'].required) {
          col['filter'].value = col['filter'].defaultValue || null;
          return col;
        }
      });
    }
    if (
      this.options.properties.filter &&
      this.options.properties.filter.action &&
      this.options.properties.filter.submissionMode === 'all'
    ) {
      this.filterButtonPossion = this.options.properties.filter.action.position;
    }
  }

  filterTableData(value: any, field: any) {
    const obj = {};
    if (this.filteredColumns.indexOf(field.name) >= 0) {
      for (let i = 0; i < this.filtersList.length; i++) {
        const filtrObj = this.filtersList[i];
        if (filtrObj.fieldName === field.name) {
          this.filtersList.splice(i, 1);
          this.filteredColumns.splice(
            this.filteredColumns.indexOf(field.name),
            1
          );
          break;
        }
      }
    }
    obj['fieldName'] = field.name;
    if (field.filter.type === 'text' || field.filter.type === 'integer') {
      if (field.filter.fieldNames && field.filter.fieldNames.length > 0) {
        obj['key'] = field.filter.fieldNames;
        obj['value'] = value;
        obj['matchType'] = 'any';
      } else {
        obj['key'] = field.name;
        obj['value'] = value;
        obj['matchType'] = 'any';
      }
    } else if (field.filter.type === 'select') {
      obj['key'] = field.name;
      obj['value'] = value.label;
      obj['matchType'] = 'exact';
    } else if (field.filter.type === 'multiselect') {
      obj['key'] = field.name;
      obj['value'] = value;
      obj['matchType'] = 'exact';
    } else if (field.filter.type === 'radio') {
      obj['key'] = field.name;
      obj['value'] = value;
      obj['matchType'] = 'exact';
    } else if (field.filter.type === 'multicheckbox') {
      obj['key'] = field.name;
      obj['value'] = value.map(item => item.value);
      obj['matchType'] = 'exact';
    } else if (field.filter.type === 'date') {
      obj['key'] = field.name;
      obj['value'] = value;
      obj['matchType'] = 'range';
    } else if (field.filter.type === 'datetime') {
      obj['key'] = field.name;
      obj['value'] = value;
      obj['matchType'] = 'range';
    } else if (field.filter.type === 'time') {
      obj['key'] = field.name;
      obj['value'] = value;
      obj['matchType'] = 'range';
    }
    if ((obj['value'] + '').length > 0) {
      this.filtersList.push(obj);
      this.filteredColumns.push(field.name);
    } else if (this.filteredColumns.indexOf(field.name) >= 0) {
      for (let i = 0; i < this.filtersList.length; i++) {
        const filtrObj = this.filtersList[i];
        if (filtrObj.fieldName === field.name) {
          this.filtersList.splice(i, 1);
          this.filteredColumns.splice(
            this.filteredColumns.indexOf(field.name),
            1
          );
          break;
        }
      }
    }
    if (
      this.options.properties.filter.action &&
      this.options.properties.filter.submissionMode === 'individual'
    ) {
      this.dt.filter(this.filtersList, 'data', 'lte');
    }
  }

  applyFilters() {
    this.filtersList = [];
    let isSearch = false;
    this.showCols.forEach(col => {
      const val = col.filter.value || col.filter.defaultValue;
      console.log('val', val);
      if (val) {
        isSearch = true;
        this.filterTableData(val, col);
      }
    });
    if (isSearch || this.enableSearch) {
      if (isSearch) {
        this.enableSearch = true;
      } else {
        this.enableSearch = false;
      }
      this.dt.filter(this.filtersList, 'data', 'lte');
    } else {
      console.log('1111 zc-data-list-filter', this.options);
      if (this.options.properties && this.options.properties.filter && this.options.properties.filter.emptySearchError) {
        if (this.options.properties.filter.emptySearchErrorMsg) {
          this.emptySearchErrorMsg = this.options.properties.filter.emptySearchErrorMsg;
        }
        this.modalService.open(this.emptySearchErrorMsgModal, { centered: true });
      }
    }
  }

  resetFilters() {
    this.showCols.forEach(col => {
      if (col.filter.value) {
        col.filter.value = col.filter.defaultValue || null;
      }
    });
    this.filtersList = [];
    this.dt.filter(this.filtersList, 'data', 'lte');
  }
}
