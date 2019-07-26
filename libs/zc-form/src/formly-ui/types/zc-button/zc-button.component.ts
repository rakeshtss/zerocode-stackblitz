import { Component, OnInit } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { AppHttpClient, ActionService } from '@zc-ui/zc-utilities';
import { Router } from '@angular/router';
declare var zc;
@Component({
  selector: 'zc-button',
  templateUrl: './zc-button.component.html',
  styleUrls: ['./zc-button.component.scss']
})
export class ZcButtonComponent extends FieldType implements OnInit {
  to: any;

  constructor(
    private http: AppHttpClient,
    private router: Router,
    private actionService: ActionService
  ) {
    super();
  }
  ngOnInit() {
    // console.log('button properties', this.to);
    if (!this.to.displayStyle) {
      this.to.displayStyle = 'button';
    }
    if (!this.to.cssClass) {
      this.to.cssClass = 'btn-primary';
    }
  }

  onClick() {
    if (this.to.action) {
      const action = this.to.action;
      this.actionService.action(action, this.model, {
        id: this.formState.widgetId,
        type: 'formBtn'
      });
    }
    if (this.to.actions) {

      this.to.actions.forEach(action => {
        this.actionService.action(action, this.model, {
          id: this.formState.widgetId,
          type: 'formBtn'
        });
      })

    }
    //   if (action.type === 'api') {
    //     const method = action.api.method;
    //     const url = action.api.url;
    //     let payload = {};
    //     if (action.api.params) {
    //       if (this.to.action.api.params.type === 'component') {
    //         const component = this.to.action.api.params.component;
    //         if (component['validate']) {
    //           this.formState.submitted = true;
    //           if (this.form.invalid) {
    //             return false;
    //           }
    //         }
    //         payload = zc[component.id][component.method](component);
    //       } else if (this.to.action.api.params.type === 'fields') {
    //         this.to.action.api.params.fields.forEach(param => {
    //           if (this.model[param.value]) {
    //             payload[param.key] = this.model[param.value];
    //           }
    //         });
    //       }
    //     }

    //     let flg = false;
    //     let flag = true;
    //     if (action.api.needConfirmation) {
    //       flg = action.api.needConfirmation;
    //     }
    //     if (flg) {
    //       flag = confirm(action.api.confirmMsg);
    //     }
    //     if (flag) {
    //       this.httpRequest(method, url, payload).subscribe(res => {
    //         if (res.success) {
    //           if (action.api.onSuccess)
    //             this.onSuccess(action.api.onSuccess, res);
    //         }
    //       });
    //     }
    //   } else if (action.type === 'component') {
    //     console.log('action.component', action.component);
    //     zc[action.component.id][action.component.method](action.component);
    //   } else if (action.type === 'page') {
    //     if(action.page && action.page.url) {
    //       this.router.navigate([action.page.url]);
    //     }
    //   }

    //   if (this.to.action.script) {
    //     const fun = new Function(this.to.action.script);
    //     fun();
    //   }
    // }
    // if (this.form.valid) {
    //   console.log('hello');
    // }
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
