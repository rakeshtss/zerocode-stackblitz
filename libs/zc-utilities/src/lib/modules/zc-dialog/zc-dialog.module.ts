import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZcDialogComponent } from './zc-dialog.component';
import { ZcDialogService } from './zc-dialog.service';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [ZcDialogComponent],
  providers: [ZcDialogService],
  declarations: [ZcDialogComponent]
})
export class ZcDailogModule { }
