import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './side-menu/sidebar-toggle.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './side-menu/dropdown-toggle.directive';
import { RouterModule } from '@angular/router';
import { SlideMenuService } from './slide-menu.service';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  imports: [CommonModule, RouterModule, MatTooltipModule],
  declarations: [
    SideMenuComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES
  ],
  providers: [SlideMenuService],
  exports: [SideMenuComponent]
})
export class SlideMenuModule {}
