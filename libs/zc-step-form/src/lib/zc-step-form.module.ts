import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcStepFormComponent } from './zc-step-form/zc-step-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ZcUiFormModule } from '@zc-ui/zc-form';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { StepPipePipe } from './zc-step-form/step-pipe.pipe';
import {MatTooltipModule} from '@angular/material/tooltip';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatStepperModule,
    ZcUiFormModule,
    MatTooltipModule
  ],
  declarations: [ZcStepFormComponent, StepPipePipe],
  exports: [ZcStepFormComponent]
})
export class ZcStepFormModule {}
