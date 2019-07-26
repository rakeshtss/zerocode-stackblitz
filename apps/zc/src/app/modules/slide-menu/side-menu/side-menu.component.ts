import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { SlideMenuService } from '../slide-menu.service';
// import { UserService } from '../../../services/user.service';
export interface MenuConfig {
  theme?: string;
  label?: string;
  code?: string;
  app?: string;
  icon?: string;
  type?: string;
  layout?: string;
  childs?: MenuConfig[];
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  menuState = 'out';
  menu: MenuConfig[] = [];
  @Input() menuStyle: any;
  constructor(private sideMenu: SlideMenuService, private renderer: Renderer2) {
    // this.userService.menu();
  }
  /**
   * This method help to setup menu from api
   *
   */
  ngOnInit() {
    this.sideMenu.getMenuList().subscribe(res => {
      if (res) {
        this.menu = <MenuConfig[]>res;
      }
    });
    // this.userService.menu().subscribe(res => {
    //   if (res) {
    //     this.menu = res;
    //   }
    // });
  }
  // Check if element has class
  private hasClass(target: any, elementClassName: string) {
    return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(
      target.className
    );
  }
  menuClose() {
    if (this.hasClass(document.querySelector('body'), 'show-menu')) {
      this.renderer.removeClass(document.body, 'show-menu');
      this.renderer.removeClass(document.body, 'stage-menu-open');
    } else {
      this.renderer.addClass(document.body, 'show-menu');
    }
  }
}
