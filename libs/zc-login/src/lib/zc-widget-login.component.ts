import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '@zc-ui/zc-utilities';
import { FormGroup } from '@angular/forms';
declare var zc;
@Component({
  selector: 'zc-login',
  templateUrl: `./zc-widget-login.component.html`,
  styles: []
})
export class ZcWidgetLoginComponent implements OnInit, AfterViewInit {
  @Input() options: any;
  formOptions: any;
  loginForm: FormGroup;
  forgotForm: FormGroup;
  submitted = false;
  fpSubmitted = false;
  isLoggedIn = false;
  isForgotPassword = false;
  credentials: any = {};
  user: any = {};
  errorMsg: string;
  constructor(private router: Router, private ls: LocalStorageService) {}

  ngOnInit() {
    this.formOptions = JSON.parse(JSON.stringify(this.options));
    this.formOptions.id = this.options.id + '_form';
    if (this.ls.getItem('credentials')) {
      this.formOptions.params = this.ls.getItem('credentials', true);
    }
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    zc[this.options.id] = this;
    this.user = this.ls.getItem('user', true);
    if (this.user) {
      if (this.user.redirectUrl && this.user.redirectUrl !== '') {
        this.router.navigate(['/' + this.user.redirectUrl]);
      }
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
  componentReady(event) {
    setTimeout(() => {
      zc[this.options.id]['form'] = zc[this.formOptions.id]['form'];
      zc[this.options.id]['formlyOptions'] =
        zc[this.formOptions.id]['formlyOptions'];
      zc[this.options.id]['submit'] = zc[this.formOptions.id]['submit'];
      zc[this.options.id]['model'] = zc[this.formOptions.id]['model'];
    }, 10);
  }

  login(res) {
    if (res.success) {
      if (zc[this.options.id]['model'].rememberMe) {
        this.ls.setItem('credentials', zc[this.options.id]['model'], true);
      }else{
        this.ls.removeItem('credentials');
      }
      this.ls.setItem('user', res.data, true);
      if (res.data.redirectUrl !== '') {
        this.router.navigate(['/' + res.data.redirectUrl]);
      } else {
        this.isLoggedIn = true;
      }
    } else {
      this.errorMsg = res.message;
    }
  }

  logout() {
    this.ls.removeItem('credentials');
    this.ls.removeItem('user');
    this.isLoggedIn = false;
  }

  navigateUrl(url) {
    this.router.navigate(['/' + url]);
  }
}
