import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '../zc-data-list-config';
import { AppHttpClient, ActionService } from '@zc-ui/zc-utilities';
declare var zc;
@Component({
  selector: 'zc-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() id: any;
  @Input() currentRow: any;
  @Input() actions: Actions;
  @Input() type: string;
  @Input() rowIndex: number;
  @Output() buttonAction: EventEmitter<any> = new EventEmitter();
  @Input() selectedRows: any;
  showItems = [];
  constructor(
    private router: Router,
    private actionService: ActionService,
    private http: AppHttpClient
  ) {}
  //   private table: ZcDataListTableComponent
  ngOnInit() {
    if (this.type === 'row' && this.actions.row) {
      this.actions.row.items.forEach(item => {
        // skip row action
        if (
          item.conditions &&
          item.conditions.hidden &&
          this.getConditionValue(item.conditions.hidden)
        ) {
        } else {
          this.showItems.push(item);
        }
        // if (item.disableCondition && item.disableCondition.value && item.disableCondition.fieldName && this.currentRow) {
        //   if (this.getItemValue(item.disableCondition.fieldName,this.currentRow) !== item.disableCondition.value) {
        //     this.showItems.push(item);
        //   }
        // } else {
        //   this.showItems.push(item);
        // }
      });
    }
  }

  getConditionValue(condition) {
    const fun = new Function('item', 'return ' + condition + ' ; ');
    return fun(this.currentRow);
  }

  onButtonClick(row) {
    if (row.type === 'page') {
      this.pageEvent(row);
    } else {
      this.buttonAction.emit(row);
    }
  }

  /**
   * @description Method will get called on click of selectable collumn
   * @author Krunal
   * @date 2019-01-09
   * `@param {*} col
   * @memberof ActionsComponent
   */
  pageEvent(row) {
    const redirectUrl = row.page.url;
    this.router.navigate([redirectUrl]);
  }

  onGroupActionClick(btn) {
    this.actionService.action(btn, this.selectedRows, {
      id: this.id,
      actionType: 'group'
    });
    this.buttonAction.emit(this.selectedRows);
    // if (btn.type === 'api') {

    //   const action = btn;
    //   const method = action.api.method;
    //   const url = action.api.url;
    //   let payload = {};
    //   if (action.api.params) {
    //     if (action.api.params.type === 'component') {
    //       const component = action.api.params.component;

    //       payload = zc[component.id][component.method](component);
    //     } else if (action.api.params.type === 'fields') {
    //       action.api.params.fields.forEach(param => {
    //         // if (this.model[param.value]) {
    //         //   payload[param.key] = this.model[param.value];
    //         // }
    //       });
    //     }
    //   }

    //   let flg = false;
    //   let flag = true;
    //   if (action.api.needConfirmation) {
    //     flg = action.api.needConfirmation;
    //   }
    //   if (flg) {
    //     flag = confirm(action.api.confirmMsg);
    //   }
    //   if (flag) {
    //     this.httpRequest(method, url, payload).subscribe(res => {
    //       if (res.success) {
    //         if (action.api.onSuccess) {
    //           // this.onSuccess(action.api.onSuccess, res);
    //         }
    //       }
    //     });
    //   }

    // } else if (btn.type === 'page' && btn.page) {
    //   const redirectUrl = (btn.page && btn.page.url) ? btn.page.url : '/';
    //   const type = btn.page.type;
    //   const target = btn.page.target === 'self' ? '_self' : '_blank';
    //   if (type === 'internal') {
    //     this.router.navigate([redirectUrl]);
    //   } else if (type === 'external') {
    //     window.open(redirectUrl, target);
    //   }
    // } else if (btn.type === 'component') {
    //   this.table.inlineFormOptions = zc[btn.component.id].options;
    //   this.table.inlineFormOptions.uid = null;
    //   this.table.inlineFormOptions.title = btn.component.title;
    //   this.table.open(btn.component.type);
    // } else {

    // }
  }

  onRowActionClick(btn) {
    this.actionService.action(btn, this.currentRow, {
      id: this.id,
      actionType: 'row'
    });
    this.buttonAction.emit(this.currentRow);
    // console.log('row action details', btn);
    // console.log(this.selectedRows);
    // if (btn.type === 'api') {

    //   const action = btn;
    //   const method = action.api.method;
    //   const url = action.api.url;
    //   let payload = {};
    //   if (action.api.params) {
    //     if (action.api.params.type === 'component') {
    //       const component = action.api.params.component;

    //       payload = zc[component.id][component.method](component);
    //     } else if (action.api.params.type === 'fields') {
    //       action.api.params.fields.forEach(param => {
    //         console.log('param', param);
    //         console.log('this.currentRow', this.currentRow);
    //         if (this.currentRow[param.key]) {
    //           payload[param.key] = this.currentRow[param.key];
    //         }
    //       });
    //     }
    //   }
    //   console.log('payload', payload);
    //   let flg = false;
    //   let flag = true;
    //   if (action.api.needConfirmation) {
    //     flg = action.api.needConfirmation;
    //   }
    //   if (flg) {
    //     flag = confirm(action.api.confirmMsg);
    //   }
    //   if (flag) {
    //     this.httpRequest(method, url, payload).subscribe(res => {
    //       if (res.success) {
    //         if (action.api.onSuccess) { }
    //         this.onSuccess(action.api.onSuccess, res);
    //       }
    //     });
    //   }

    // } else if (btn.type === 'page') {
    //   const redirectUrl = btn.page.url;
    //   const type = btn.page.type;
    //   const target = btn.page.target === 'self' ? '_self' : '_blank';
    //   if (type === 'internal') {
    //     console.log('row action details', redirectUrl);
    //     console.log('currentRow', this.currentRow);
    //     this.router.navigate([redirectUrl + '/' + this.currentRow.uid]);
    //   } else if (type === 'external') {
    //     window.open(redirectUrl, target);
    //   }
    // } else if (btn.type === 'component') {
    //   console.log('btn', zc[btn.component.id]);
    //   console.log('currentRow', this.currentRow);
    //   this.table.inlineFormOptions = zc[btn.component.id].options;
    //   this.table.inlineFormOptions.uid = this.currentRow.uid;
    //   this.table.inlineFormOptions.title = btn.component.title;
    //   this.table.open(btn.component.type);
    // }
  }

  getItemValue(key, item) {
    const colKey = 'item.' + key;
    const fun = new Function('item', 'return ' + colKey + ' ; ');
    return fun(item);
  }
  onSuccess(actions, resData) {
    actions.forEach(action => {
      if (action.type === 'component') {
        zc[action.component.id][action.component.method](action.component);
      } else if (action.type === 'page') {
        if (action.page && action.page.url) {
          this.router.navigate([action.page.url]);
        }
      }
    });
  }
  httpRequest(method?: string, url?: string, payload?: object) {
    if (method === 'post') {
      return this.http.post(url, payload);
    } else if (method === 'put') {
      return this.http.put(url, payload);
    } else if (method === 'patch') {
      return this.http.patch(url, payload);
    } else if (method === 'delete') {
      return this.http.delete(url, payload);
    } else {
      return this.http.get(url);
    }
  }
}
