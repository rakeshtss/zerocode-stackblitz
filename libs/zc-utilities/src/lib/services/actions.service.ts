import { Injectable } from '@angular/core';
import { AppHttpClient } from './app-http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfigService } from './app-config.service';
declare var zc;
@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(
    private http: AppHttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private appConfigService: AppConfigService
  ) { }

  action(action, dataObj?: any, componentInfo?: any) {
    console.log('action details', action);
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log('params', params);
    });
    let uid = null;
    if (zc['params'] && zc['params']['uid']) {
      uid = zc['params']['uid'];
    }
    const uidObj = { uid: uid, params: zc['params'] };
    const onlyDataObj = Object.assign({}, dataObj);
    dataObj = { ...uidObj, ...dataObj };
    let actionFlg = false;
    let actionConfirm = true;
    if (action.needConfirmation) {
      actionFlg = action.needConfirmation;
    }
    if (actionFlg) {
      actionConfirm = confirm(action.confirmMsg);
    }
    if (actionConfirm) {
      if (action.type === 'api') {
        const method = action.api.method;
        const url = action.api.url;
        let payload = {};
        if (action.api.params) {
          payload = this.getParams(action.api.params, dataObj);
        }
        if (action.api.component) {
          const component = action.api.component;
          if (action.api.params) {
            payload = this.getParams(action.api.params, dataObj);
          } else {
            payload = zc[component.id][component.method](component);
          }
          if (component['validate']) {
            if (zc[component.id].formlyOptions.formState) {
              zc[component.id].formlyOptions.formState.submitted = true;
            }
            if (zc[component.id].form.invalid) {
              if (component['invalidMsg']) {
                alert(component['invalidMsg']);
              }
              return false;
            }
          }
        }
        if (action.api.extraParams) {
          action.api.extraParams.forEach(param => {
            payload[param.name] = param.value;
          });
        }
        let flg = false;
        let flag = true;
        if (action.api.needConfirmation) {
          flg = action.api.needConfirmation;
        }
        if (flg) {
          flag = confirm(action.api.confirmMsg);
        }
        if (flag) {
          this.httpRequest(method, url, payload).subscribe(res => {
            if (res.success) {
              if (action.api.onSuccess)
                this.onSuccess(action.api.onSuccess, res);
            } else {
              console.log('onFailure -->', res);
              if (action.api.onFailure)
                this.onSuccess(action.api.onFailure, res);
            }
          });
        }
      } else if (action.type === 'component') {
        const c: any = action.component;
        if (c.type === 'modal' || c.type === 'inline') {
          let cloneFormOptions: any = {};
          cloneFormOptions = JSON.parse(
            JSON.stringify(zc[c.id + '_ref'].options)
          );
          if (c.params) {
            cloneFormOptions.params = this.getParams(c.params, dataObj);
          }
          if (c.hidden) {
            c.hidden.forEach(key => {
              this.searchFormField(cloneFormOptions.fields, key.name);
            });
          }

          if (componentInfo.type === 'formBtn') {
            zc[componentInfo.id].inlineFormOptions = cloneFormOptions;
            zc[componentInfo.id].inlineFormOptions.title = c.title;
            if (c.mode) {
              zc[componentInfo.id].inlineFormOptions.mode = c.mode;
            }
            if (c.preFileData) {
              zc[componentInfo.id].inlineFormOptions.model = onlyDataObj;
            }
            zc[componentInfo.id].open(c.type);
          } else {
            zc[componentInfo.id].table.inlineFormOptions = cloneFormOptions;
            zc[componentInfo.id].table.inlineFormOptions.title = c.title;
            if (c.mode) {
              zc[componentInfo.id].table.inlineFormOptions.mode = c.mode;
            }
            zc[componentInfo.id].table.open(c.type);
          }
        } else if (c.type === 'prefile') {
          if (!zc[c.id + '_ref']) {
            let cloneFormOptions: any = {};
            cloneFormOptions = JSON.parse(JSON.stringify(zc[c.id].options));
            zc[c.id + '_ref'] = { options: cloneFormOptions };
          }

          zc[c.id].options.title = c.title;
          zc[c.id].model = onlyDataObj;
          if (c.hidden) {
            c.hidden.forEach(key => {
              this.searchFormField(zc[c.id].options.fields, key.name);
            });
          }
        } else if (c.type === 'listFilters') {
          const fields = zc[c.id].fields;
          const model = zc[c.id].model;
          if (c['validate']) {
            if (zc[c.id].formlyOptions.formState) {
              zc[c.id].formlyOptions.formState.submitted = true;
            }

            if (zc[c.id].form.invalid) {
              if (c['invalidMsg']) {
                alert(c['invalidMsg']);
              }
              return false;
            }
          }
          const listFilters = this.getFormlyFormat(fields);
          zc[c.listId].table[action.component.method](listFilters);
        } else {
          if (zc[action.component.id] && zc[action.component.id][action.component.method]) {
            zc[action.component.id][action.component.method](action.component);
          }
        }
      } else if (action.type === 'page') {
        const redirectUrl = action.page.url;
        const type = action.page.type;
        const target = action.page.target === 'self' ? '_self' : '_blank';
        if (type === 'internal') {
          let pageParams = '';
          if (action.page.params) {
            const params = this.getParams(action.page.params, dataObj);
            const paramsKeys = Object.keys(params);
            if (paramsKeys.length > 0) {
              paramsKeys.forEach((key, index) => {
                pageParams += '/' + params[key];
              });
            }
          }
          this.router.navigate([redirectUrl + pageParams]);
        } else if (type === 'external') {
          window.open(redirectUrl, target);
        } else {
          this.router.navigate([action.page.url + '/' + dataObj.uid]);
        }
      } else if (action.type === 'script') {
        if (action.script) {
          try {
            const fun = new Function(action.script);
            fun();
          } catch (error) {
            console.log('error', error, action.script);
          }
        }
      } else if (action.type === 'download') {
        const method = action.download.method;
        const url = action.download.url;
        let payload = {};
        if (action.download.params) {
          payload = this.getParams(action.download.params, dataObj);
        }

        if (action.download.component) {
          const component = action.download.component;
          if (action.download.params) {
            payload = this.getParams(action.download.params, dataObj);
          } else {
            payload = zc[component.id][component.method](component);
          }
          if (component['validate']) {
            if (zc[component.id].formlyOptions.formState) {
              zc[component.id].formlyOptions.formState.submitted = true;
            }
            if (zc[component.id].form.invalid) {
              if (component['invalidMsg']) {
                alert(component['invalidMsg']);
              }
              return false;
            }
          }
        }

        this.httpRequest(method, url, payload).subscribe(res => {
          if (res.success) {
            if (res.data.url) {
              console.log('this.appConfigService.settings.fileServer + res.data.url', this.appConfigService.settings.fileServer + res.data.url);
              window.open(this.appConfigService.settings.fileServer + res.data.url, '_blank');
            }

          }
        });


      }
    }
  }

  onSuccess(actions, resData) {
    actions.forEach(action => {
      if (action.type === 'component') {
        if (zc[action.component.id]) {
          zc[action.component.id][action.component.method](resData, action.component);
        }
      } else if (action.type === 'page') {
        if (action.page && action.page.url) {
          let pageParams = '';
          if (action.page.params) {
            const params = this.getParams(action.page.params, resData.data);
            console.log('params', params);
            const paramsKeys = Object.keys(params);
            if (paramsKeys.length > 0) {
              paramsKeys.forEach((key, index) => {
                pageParams += '/' + params[key];
              });
            }
          }
          this.router.navigate([action.page.url + pageParams]);
        }
      } else if (action.type === 'script') {
        if (action.script) {
          try {
            const fun = new Function(action.script);
            fun();
          } catch (error) {
            console.log('error', error, action.script);
          }
        }
      }
    });
  }
  getParams(params, value) {
    const _params: any = {};
    if (params && params.length > 0) {
      params.forEach(param => {
        if (param.type === 'array') {
          _params[param.name] = [this.getKeyValue(param.value, value)]; // [value[param.value]];
        } else if (param.type === 'string') {
          _params[param.name] = {};

          if (this.getKeyValue(param.value, value) !== undefined) {
            _params[param.name] = this.getKeyValue(param.value, value);
          } else {
            _params[param.name] = param.value;
          }
          // _params[param.name] =
          //   this.getKeyValue(param.value, value) || param.defaultValue;
        } else {
          _params[param.name] = {};
          if (param.keys) {
            param.keys.forEach(key => {
              _params[param.name][key.key] =
                this.getKeyValue(key.value, value) || param.defaultValue; // value[key.value];
            });
          }
        }
      });
    }
    return _params;
  }
  searchFormField(fields, fieldName) {
    fields.forEach(f => {
      if (f.name === fieldName) {
        f.properties.hidden = true;
      }
      if (f.fieldItems) {
        this.searchFormField(f.fieldItems, fieldName);
      }
    });
  }
  getFormlyFormat(fields, data: any = []): any[] {
    // const data: any = [];
    fields.forEach(field => {
      if (field.fieldGroup && field.fieldGroup.length) {
        this.getFormlyFormat(field.fieldGroup, data);
      } else {
        if (field.formControl.value) {
          const temField: any = {};
          temField.name = field.key;
          temField.type = field.type;
          temField.properties = field.templateOptions;
          if (field.templateOptions && field.templateOptions.fieldNames) {
            temField.fieldNames = field.templateOptions.fieldNames;
          }
          const value = field.formControl.value;
          const filterData = this.filterTableData(value, temField);
          if (filterData) {
            data.push(filterData);
          }
        }
      }
    });
    return data;
  }

  /**
   * @descriptiondata list 
   * @author T Rakesh Kumar
   * @date 2019-05-07
   * @param object value
   * @param object field
   * @returns object
   */
  filterTableData(value: any, field: any) {

    let filterKey: any;
    filterKey = (field.properties && field.properties.filterKey) ? field.properties.filterKey : filterKey = field.name;

    const obj = {};
    obj['fieldName'] = filterKey;
    if (field.type === 'text' || field.type === 'integer') {
      if (field.fieldNames && field.fieldNames.length > 0) {
        obj['key'] = field.fieldNames;
        obj['value'] = value;
        obj['matchType'] = 'any';
      } else {
        obj['key'] = filterKey;
        obj['value'] = value;
        obj['matchType'] = 'any';
      }
    } else if (field.type === 'select') {
      obj['key'] = filterKey;
      obj['value'] = value.name;
      obj['matchType'] = 'exact';
    } else if (field.type === 'select' && field.properties.multiple) {
      obj['key'] = filterKey;
      obj['value'] = value;
      obj['matchType'] = 'exact';
    } else if (field.type === 'radio') {
      obj['key'] = filterKey;
      obj['value'] = event;
      obj['matchType'] = 'exact';
    } else if (field.type === 'checkbox' && field.properties.multiple) {
      const val = value.map(item => item.name);
      obj['key'] = filterKey;
      obj['value'] = val && val.length > 0 ? val : null;
      obj['matchType'] = 'exact';
    } else if (field.type === 'date') {
      obj['key'] = filterKey;
      obj['value'] = [value];
      obj['matchType'] = 'range';
    } else if (field.type === 'daterange') {
      obj['key'] = filterKey;
      obj['value'] = value;
      obj['matchType'] = 'range';
    } else {
      obj['key'] = filterKey;
      obj['value'] = value;
      obj['matchType'] = 'any';
    }
    if (obj['value']) {
      return obj;
    }
    return false;
  }

  getKeyValue(key, value) {
    try {
      const colKey = 'value.' + key;
      const fun = new Function('value', 'return ' + colKey + ' ; ');
      return fun(value);
    } catch (error) {
      console.log('key', key, value);
    }

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
