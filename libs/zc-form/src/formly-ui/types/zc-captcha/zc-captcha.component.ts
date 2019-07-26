import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppConfigService } from '@zc-ui/zc-utilities';
import { FieldType } from '@ngx-formly/core';
declare var zc;

@Component({
  selector: 'zc-ui-zc-captcha',
  templateUrl: './zc-captcha.component.html',
  styleUrls: ['./zc-captcha.component.scss']
})
export class ZcCaptchaComponent extends FieldType implements OnInit, AfterViewInit {
  captchaValue = '';
  captchaImageUrl = '';
  captchaUniqueID: any;
  constructor(public appConfig: AppConfigService) {
    super();
  }

  ngOnInit() {
    // console.log('appConfig', this.appConfig);
    // console.log('to-->>', this.to);
    this.getCaptchaImage();
  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    // this.options.component = this;
    if (this.field.key) {
      zc[this.field.key] = this;
    }
  }
  
  getCaptchaImage(){
    if(this.captchaValue){
      this.captchaValue = null;
    }
    this.formControl.setValue(null);
    const randomNumber = Math.floor(Math.random() * 10000000000);
    this.captchaUniqueID = Date.now() +''+ randomNumber;
    this.captchaImageUrl = this.appConfig.settings.apiUrl + this.appConfig.settings.client + '/captcha/' + this.captchaUniqueID;
    // console.log('captchaUniqueID', this.captchaUniqueID);
  }

  keyup(value){
    // console.log('this.formControl', this.formControl);
    
  if(value){
    if(value.length === 6){
      this.formControl.setValue({
        id: this.captchaUniqueID,
        value: value
      });
    } else {
      this.formControl.setErrors({required: true});
    }
    
  } else {
    this.formControl.setValue(null);
  }
  // console.log('keyup', this.captchaUniqueID, this.formControl.value);
  }

  showResponse(response) {
    if (response.response) {
      this.formControl.setValue(response.response);
    } else {
      this.formControl.setValue(null);
    }
    //call to a backend to verify against recaptcha with private key
  }

  onExpire(response) {
    this.formControl.setValue(null);
  }

}
