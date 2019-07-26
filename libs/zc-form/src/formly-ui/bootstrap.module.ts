import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import {
  BOOTSTRAP_FORMLY_CONFIG,
  FIELD_TYPE_COMPONENTS
} from './bootstrap.config';
import { ChipsModule } from 'primeng/chips';
import { TableModule } from 'primeng/table';
import { NgxDynamicTemplateModule } from 'ngx-dynamic-template';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ZcFormModule } from '../lib/zc-form.module';
import { ZcPatternDirective } from './directives/zc-pattern.directive';
// PrimeNG components
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SpinnerModule } from 'primeng/spinner';
import { PasswordModule } from 'primeng/password';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { CaptchaModule } from 'primeng/captcha';
import { NgxEditorModule } from 'ngx-editor';
import { AgmCoreModule, LAZY_MAPS_API_CONFIG } from '@agm/core';
import { ZcUtilitiesModule, AppConfigService } from '@zc-ui/zc-utilities';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import { MapsConfig } from './types/zc-gmap/zc-gmap-config';
import { CurrencyMaskModule } from "ngx-currency-mask";
@NgModule({
  declarations: [FIELD_TYPE_COMPONENTS, ZcPatternDirective],
  imports: [
    CommonModule,
    ZcUtilitiesModule,
    FormsModule,
    ReactiveFormsModule,
    FormlySelectModule,
    ZcFormModule,
    ChipsModule,
    FormlyModule.forRoot(BOOTSTRAP_FORMLY_CONFIG),
    TableModule,
    NgxDynamicTemplateModule,
    NgbModule,
    DropdownModule,
    MultiSelectModule,
    NgxEditorModule,
    AgmCoreModule.forRoot({
      libraries: ['places']
    }),
    AutoCompleteModule,
    SpinnerModule,
    PasswordModule,
    InputSwitchModule,
    CalendarModule,
    CaptchaModule,
    PageRenderModule,
    CurrencyMaskModule
  ],
  providers: [{
    provide: LAZY_MAPS_API_CONFIG,
    useClass: MapsConfig,
    deps: [AppConfigService]
  }]
})
export class FormlyBootstrapModule { }
