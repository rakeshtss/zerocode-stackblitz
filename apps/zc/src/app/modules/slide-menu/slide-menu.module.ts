import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './side-menu/sidebar-toggle.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './side-menu/dropdown-toggle.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    SideMenuComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES
  ],
  providers: [],
  exports: [SideMenuComponent]
})
export class SlideMenuModule {}
