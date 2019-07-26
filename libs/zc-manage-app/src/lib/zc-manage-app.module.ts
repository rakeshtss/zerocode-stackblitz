import { NgModule } from '@angular/core';
import { ZcManageAppComponent } from './zc-manage-app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ZcManageAppService } from './zc-manage-app.service';

@NgModule({
  declarations: [ZcManageAppComponent],
  imports: [CommonModule, RouterModule, DropdownModule],
  providers: [ZcManageAppService],
  exports: [ZcManageAppComponent]
})
export class ZcManageAppModule {}
