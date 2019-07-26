import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  AfterContentChecked,
  AfterViewInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { ZcWidgetDataListService } from '../zc-data-list.service';
import { CommonModule } from '@angular/common';
import { TimeAgoModule } from '../time-ago/time-ago.module';
import {
  NgbDropdownConfig,
  NgbDropdown,
  NgbModalRef
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataTable } from 'primeng/datatable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ZcDataListConfig } from '../zc-data-list-config';
import { ActionService } from '@zc-ui/zc-utilities';
import { DataListSharedModule } from '../data-list-shared/data-list-shared.module';
import { AppConfigService } from '@zc-ui/zc-utilities';
declare var zc;
@Component({
  selector: 'zc-data-list-table',
  templateUrl: './zc-data-list-table.component.html',
  providers: [NgbDropdownConfig, NgbDropdown],
  styleUrls: ['./zc-data-list-table.component.scss']
})
export class ZcDataListTableComponent
  implements OnInit, AfterViewInit, OnDestroy, AfterContentChecked {
  @Input() options: ZcDataListConfig;
  @ViewChild('dt') dt: DataTable;
  @ViewChild('zcFormModal') zcFormModal: any;
  currentDtEvent: any;
  modal: NgbModalRef;
  cols: any = [];
  filterCols: any = [];
  rows: any = [];
  totalRecords: number;
  loading = false;
  inlineForm = false;
  showTable = false;
  myExtraModules = [CommonModule, DataListSharedModule];
  isLazy: boolean;
  paginator = false;
  frozenCols: any;
  scrollableCols: any;
  scrollable = false;
  hover = false;
  selectedRows: any = [];
  groupcHeaders: any = [];
  frozenWidth: string;
  inlineFormOptions: any;
  totalPages = 0;
  tableStyleClass = 'table-view';
  rowGroupMetadata: any = [];
  firstTimeAddedpivotCols = true;
  selectionMode: any; // single or multipe
  baseUrl: any;
  externalFilters: any = [];
  _zc: any;
  constructor(
    private zcDataListService: ZcWidgetDataListService,
    private actionService: ActionService,
    private config: NgbDropdownConfig,
    private router: Router,
    private modalService: NgbModal,
    private appConfigService: AppConfigService
  ) {
    this.config.autoClose = 'outside';
  }
  ngOnInit() {
    if (this.options.properties && this.options.properties.rowSelection) {
      // this.options.properties.rowSelection.type row or checkbox
      this.selectionMode = (this.options.properties.rowSelection.type === 'row') ? 'single' : 'multiple';
    }

    if (this.options.events && this.options.events.onLoad) {
      this.eventBind(this.options.events.onLoad);
    }
    this._zc = zc;
    this.baseUrl = this.appConfigService.settings.fileServer + 'get/';
    this.isLazy = this.options.properties.lazy;
    if (!this.options.properties.pagination.autoScroll) {
      this.paginator = true;
    }
    if (this.options.properties.lazy===false) {
      this.getDataList();
    }
    const cloneCols = Object.assign([], this.options.cols);
    if(this.options.cols && this.options.cols.filter){
      this.cols = this.options.cols.filter(
        col => !col.hidden || col.hidden !== true
      );
    }

    this.filterCols = cloneCols;
    this.getDropdownsOption();
    if (
      this.options.properties.styling.freezeColumn &&
      this.options.properties.styling.freezeColumn > 0
    ) {
      let freezeColumnCount = this.options.properties.styling.freezeColumn;
      this.scrollableCols = [];
      this.frozenCols = [];
      this.scrollable = true;
      let width = 0;

      this.cols.forEach(col => {
        col.width = col.width ? col.width : 150;

        if (freezeColumnCount !== 0) {
          this.frozenCols.push(col);
          freezeColumnCount--;
          width += col.width;
        } else {
          this.scrollableCols.push(col);
        }
        col.width = col.width + 'px';
      });

      this.frozenWidth = width + 'px';
    }
    if (this.options.properties.groupHeader) {
      this.options.properties.groupHeader.forEach(groupC => {
        const groupcColumns = [];
        groupC.columns.forEach(column => {
          if (column.key) {
            this.cols.forEach(col => {
              if (column.key === col.name) {
                if (column.rowspan) {
                  col.rowspan = column.rowspan;
                }
                if (column.colspan) {
                  col.colspan = column.colspan;
                }
                groupcColumns.push(col);
              }
            });
          } else {
            if (
              (this.options.actions &&
                this.options.actions.row &&
                column.type === 'actions') ||
              !column.type
            ) {
              groupcColumns.push(column);
            }
          }
        });
        this.groupcHeaders.push(groupcColumns);
      });
    }
    if (
      this.options.properties.type &&
      this.options.properties.type === 'card'
    ) {
      this.tableStyleClass = 'card-view';
      if (this.options.properties.cardTemplateJson) {
        this.options.properties.cardTemplate = this.getJsonToHtml(
          '',
          this.options.properties.cardTemplateJson.widgets
        );
      }
    }
    if (
      this.options.properties.styling &&
      this.options.properties.styling.container &&
      this.options.properties.styling.container.cssClass
    ) {
      this.tableStyleClass =
        this.tableStyleClass +
        ' ' +
        this.options.properties.styling.container.cssClass;
    }
  }
  ngAfterViewInit(): void {
    zc[this.options.id] = this;
  }
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
  }
  /**
   * @description method to get list records
   * @author Krunal
   * @date 2019-01-07
   * memberof ZcDataListTableComponent
   */
  getDataList(event = null) {
    let payload: any = {};
    if (event) {
      this.currentDtEvent = event;
      payload = {
        page: Math.ceil(event.first / event.rows + 1),
        rows: event.rows
      };
      if (event.filters && event.filters.data && event.filters.data.value) {
        payload.dynaFilters = event.filters.data.value.filter(res => res.value);
        if (event.filters.page) {
        } else {
          payload.page = 1;
          event.filters.page = payload.page;
        }
      } else if(this.externalFilters){
        payload.dynaFilters = this.externalFilters;
      }
      if (event.multiSortMeta) {
        //  sord: event.sortOrder < 0 ? 'DESC' : 'ASC', globalFilter: event.globalFilter,
        payload.sort = [];
        event.multiSortMeta.forEach(s => {
          payload.sort.push({ key: s.field, order: s.order < 0 ? 'DESC' : 'ASC' })
        });
      }
      if (this.options.properties.defaultOrder && this.options.properties.defaultOrder.length > 0) {
        if (!event.multiSortMeta) {
          payload.sort = this.options.properties.defaultOrder.filter(res => !res.fixed);
        }
        const fixedSord = this.options.properties.defaultOrder.filter(res => res.fixed);
        if (fixedSord.length > 0) {
          payload.sort = [...payload.sort, ...fixedSord];
        }
      }
    }
    if (this.options.properties.api && this.options.properties.api.params) {
      payload.dependents = this.actionService.getParams(
        this.options.properties.api.params,
        this.options
      );
    }

    // if (this.options.uid) {

    //   payload['dependents'] = {
    //     company : {  uid: this.options.uid }
    //   };
    // }
    if (this.options.properties.api && this.options.properties.api.url) {
      this.loading = true;
      this.zcDataListService
        .getDataList(this.options.properties.api.url, payload)
        .subscribe(
          res => {
            if (res.success) {
              const rows = res.data.listData ? res.data.listData.rows : [];
              this.rowGroupMetadata = [];
              if (
                this.options.properties.groupRow &&
                this.options.properties.groupRow.keys
              ) {
                if (rows.length > 0) {
                  this.groupGridView(
                    rows,
                    0,
                    this.options.properties.groupRow.keys.length
                  );
                }
                console.log('this.rowGroupMetadata', this.rowGroupMetadata);
                console.log('this.rows', rows);
              }
              if (
                res.data &&
                res.data.listData &&
                res.data.listData.pivotData
              ) {
                if (this.firstTimeAddedpivotCols) {
                  this.cols = [...this.cols, ...res.data.listData.pivotData];
                  this.firstTimeAddedpivotCols = false;
                }
              }
              if (this.options.properties.pagination.autoScroll) {
                // this.rows = [...rows, ...this.rows];
                this.rows = rows;
              } else {
                this.rows = rows;
              }
              this.totalRecords = res.data.listData
                ? res.data.listData.records
                : 0;
              this.totalPages = Math.ceil(this.totalRecords / payload.rows);
              this.loading = false;
              this.showTable = true;
            }
          },
          err => {
            console.log('err', err);
            this.loading = false;
          }
        );
    }
  }

  /**
   * @description Method will get called on click of selectable collumn
   * @author Krunal
   * @date 2019-01-09
   * `@memberof ZcDataListTableComponent
   */
  redirectPage(col, row: any) {
    if (col.action.type === 'page') {
      let redirectUrl = col.action.page.url;
      if (col.action.page.type !== 'external' && row.uid !== '') {
        redirectUrl = redirectUrl + '/' + row.uid;
      }
      this.router.navigate([redirectUrl]);
    }
  }

  /**
   * @description
   * @author Krunal
   * @date 2019-01-09
   * `@param {*} data
   * @memberof ZcDataListTableComponent
   */
  buttonAction(row, modalContent) {
    if (row.type === 'component') {
      this.componentEvent(row, modalContent);
    }
  }

  componentEvent(row, modalContent) {
    if (row.component.type === 'modal') {
      this.openModal(modalContent);
    } else {
      this.inlineForm = true;
      if (row.component.hideParent) {
        this.showTable = false;
      } else {
        this.showTable = true;
      }
    }
  }
  openModal(modalRef) {
    this.modalService.open(modalRef);
  }

  /**
   * @description method to getting search values
   * @author Virendra
   * @date 2019-01-10
   * `@memberof ZcDataListTableComponent
   */
  onSearch(value, field) {
    let fieldNames = [];
    if (field.filter.fieldNames) {
      fieldNames = field.filter.fieldNames.split(',');
      const searchField = [];

      fieldNames.forEach((key, index) => {
        const obj = {};
        obj[key.trim()] = value;
        searchField.push(obj);
      });
    }
  }

  onChange(value, field) { }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2019-05-08
   */
  onRowSelect(event) {
    console.log('event', event);
    if (this.options.properties.rowSelection.type === 'row') {
      this.actionService.action(this.options.properties.rowSelection.action, event.data, {
        id: this.options.id,
        actionType: 'row'
      });
    }

  }


  /**
   * @description method to getting dataScource and appending dataSource values in cols
   * @author Virendra
   * @date 2019-01-09
   * `@memberof ZcDataListTableComponent
   */
  getDropdownsOption() {
    this.filterCols.forEach(col => {
      if (col.filter && col.filter.dataSource) {
        let method = 'get';
        if (col.filter.method) {
          method = col.filter.method;
        }
        this.zcDataListService
          .getFilterData(col.filter.dataSource, {}, method)
          .subscribe(res => {
            col['options'] = [];
            if (res) {
              res.forEach(row => {
                col.options.push({
                  label: this.getItemValue(col.filter.dataLabel, row),
                  value: this.getItemValue(col.filter.dataValue, row)
                });
              });
            }
          });
      }
    });
  }

  /**
   * @description
   * @author T Rakesh Kumar
   * @date 2019-01-21
   * @param object row
   * @param number rowIindex
   * @returns object
   */
  getRowStyles(row, rowIindex) {
    const cssStyle = {};
    if (this.options.properties.styling.row) {
      cssStyle['background-color'] = this.getRowColor(row, rowIindex);
      if (this.options.properties.styling.row.mouseOverColorSource) {
        cssStyle['background-color'] = row.hover
          ? this.options.properties.styling.row.mouseOverColorSource
          : this.getRowColor(row, rowIindex);
      }
    }
    return cssStyle;
  }

  getRowColor(row, rowIindex) {
    let rowColor = '';
    if (this.options.properties.styling.row) {
      if (this.options.properties.styling.row.bgColorSource) {
        rowColor = this.options.properties.styling.row.bgColorSource;
      }
      if (
        this.options.properties.styling.row.evenColor ||
        this.options.properties.styling.row.oddColor
      ) {
        if (rowIindex % 2 === 0) {
          rowColor = this.options.properties.styling.row.oddColor;
        } else {
          rowColor = this.options.properties.styling.row.evenColor;
        }
      }
    }
    return rowColor;
  }

  checkFieldDisableSelection(row, forRow) {
    if (
      forRow &&
      this.options.properties.rowSelection &&
      this.options.properties.rowSelection.type === 'checkbox'
    ) {
      return !forRow;
    }
    if (
      this.options.properties.rowSelection &&
      this.options.properties.rowSelection.disableCondition &&
      this.options.properties.rowSelection.disableCondition.value &&
      this.options.properties.rowSelection.disableCondition.fieldName
    ) {
      return (
        this.options.properties.rowSelection.disableCondition &&
        this.getItemValue(
          this.options.properties.rowSelection.disableCondition.fieldName,
          row
        ) !== this.options.properties.rowSelection.disableCondition.value
      );
    } else {
      return false;
    }
  }

  getItemValue(key, item) {
    const colKey = 'item.' + key;
    const fun = new Function('item', 'return ' + colKey + ' ; ');
    return fun(item);
  }

  checkPrefixSuffixIconVisible(row, prefSuf) {
    if (
      prefSuf.condition &&
      prefSuf.condition.value &&
      prefSuf.condition.fieldName
    ) {
      return (
        prefSuf.condition &&
        this.getItemValue(prefSuf.condition.fieldName, row) ===
        prefSuf.condition.value
      );
    } else {
      return false;
    }
  }
  open(type = 'inline') {
    // this.inlineForm = !this.inlineForm;
    if (type === 'inline') {
      this.inlineForm = false;
      setTimeout(() => {
        this.inlineForm = true;
      }, 0);
    } else if (type === 'modal') {
      // backdrop: 'static'
      this.modal = this.modalService.open(this.zcFormModal, {
        size: 'lg',
        centered: true
      });
    }
  }
  close(type = 'inline') {
    if (type === 'inline') {
      this.inlineForm = false;
      if (this.modal) {
        this.modal.dismiss();
      }
    } else if (type === 'modal') {
      // backdrop: 'static'
      this.modal.dismiss();
    }
  }

  /**
   * @description  past data reload data table
   * @author T Rakesh Kumar
   * @date 2019-05-07
   */
  reload() {
    // this.dt.reset(this.currentDtEvent);
    this.getDataList(this.currentDtEvent);
  }

  /**
   * @description set filterdata from actions || other widget
   * @author T Rakesh Kumar
   * @date 2019-05-07
   * @param array filterData
   */
  applyFilters(filterData) {
    this.externalFilters = filterData;
    if(this.options.hiddenList === true) {
      this.options.hiddenList = false;
    } else {
      if (this.dt) {
        this.dt.filter(filterData, 'data', 'lte');
      } else {
        setTimeout(() => {
          this.dt.filter(filterData, 'data', 'lte');
        }, 100);
      }
    }
  }

  /**
   * @description convert json object to html
   * @author T Rakesh Kumar
   * @date 2019-03-25
   * @param string htmlTemplate
   * @param array widgets
   * @returns string;
   */
  getJsonToHtml(htmlTemplate, widgets) {
    widgets.forEach(widget => {
      const prop = widget.properties;
      switch (widget.type) {
        case 'block':
          htmlTemplate += '<div class="' + prop.cssClass + '">';
          if (widget.widgets && widget.widgets.length > 0) {
            htmlTemplate = this.getJsonToHtml(htmlTemplate, widget.widgets);
          }
          htmlTemplate += '</div>';
          break;
        case 'component':
          if (prop.type === 'gallery') {
            htmlTemplate +=
              "<zc-slideshow panelWidth='" +
              prop.width +
              "' panelHeight='" +
              prop.height +
              "' [imageUrls]='row." +
              prop.name +
              "' defaultImage='" +
              prop.defaultImage +
              "'></zc-slideshow>";
          }
          if (prop.type === 'actions') {
            htmlTemplate +=
              "<zc-actions   [actions]='options." +
              prop.name +
              "'  type='row' [currentRow]='row' [id]='options.id'></zc-actions>";
          }
          break;

        case 'column':
          // console.log(widget.type);

          if (prop.label) {
            htmlTemplate += '<label>' + prop.label + '</label>';
          }
          if (prop.name) {
            htmlTemplate += '<span>{{row.' + prop.name + '}}</span>';
          }

          break;
        case 'template':
          htmlTemplate += prop.template;
          break;
      }
    });
    console.log('htmlTemplate', htmlTemplate);
    return htmlTemplate;
  }

  /**
   * @description grouing rows
   * @author T Rakesh Kumar
   * @date 2019-03-25
   * @param array rows
   * @param int startIndex
   * @param int total
   * @returns array
   */
  groupGridView(rows, startIndex, total) {
    const keys = this.options.properties.groupRow.keys;
    if (total === 0) return;
    let count = 1;
    let lst = [];
    lst.push(rows[0]);
    let ctrl = rows[0][keys[startIndex]];
    for (let i = 1; i < rows.length; i++) {
      const nextCell = rows[i][keys[startIndex]];
      nextCell.visible = true;
      if (ctrl.name === nextCell.name) {
        count++;
        nextCell.visible = false;
        //  this.rowGroupMetadata[rows[i]['index']] = { key: keys[startIndex], visible: false };
        lst.push(rows[i]);
      } else {
        if (count > 1) {
          ctrl.rowSpan = count;
          // this.rowGroupMetadata[rows[i]['index']] = { key: keys[startIndex], rowSpan: ctrl.rowSpan };
          this.groupGridView(lst, startIndex + 1, total - 1);
        }
        count = 1;
        lst = [];
        ctrl = rows[i][keys[startIndex]];
        lst.push(rows[i]);
      }
    }
    if (count > 1) {
      ctrl.rowSpan = count;
      this.groupGridView(lst, startIndex + 1, total - 1);
    }
    count = 1;
    lst = [];
    /// console.log("lst", lst);
  }
  sortRows(rows, key) {
    rows.sort((a: any, b: any) => {
      // a[key].name = (a[key].name) ? a[key].name : 'null';
      // b[key].name = (b[key].name) ? b[key].name : 'null';
      if (a[key].name < b[key].name) {
        return -1;
      } else if (a[key].name > b[key].name) {
        return 1;
      } else {
        return 0;
      }
    });
    return rows;
  }
  eventBind(script) {
    try {
      const fun = new Function('options', 'rows', script);
      fun(this.options, this.rows);
    } catch (error) {
      console.log('script', script);
    }
  }
  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if (this.modal) {
      this.modal.dismiss();
    }
  }
}
