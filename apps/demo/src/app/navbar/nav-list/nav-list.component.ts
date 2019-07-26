import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'nav-list',
  templateUrl: './nav-list.component.html',
  styleUrls: ['./nav-list.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state(
        'collapsed',
        style({
          transform: 'rotate(0deg)'
        })
      ),
      state(
        'expanded',
        style({
          transform: 'rotate(180deg)'
        })
      ),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ])
  ]
})
export class NavListComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item;
  @ViewChild('') ele: Element;
  ChildrenLink: any = [];
  lastItem: number;
  lastSecond: number;

  /**
   * @description for getting current route path
   */
  constructor(public router: Router) {
    const url = window.location.href;
    this.ChildrenLink = url.split('/');
    this.lastItem = this.ChildrenLink.length - 1;
    this.lastSecond = this.ChildrenLink.length - 2;
  }

  /**
   * @description for getting activated link on page load
   */
  ngOnInit() {
    this.expanded = false;
    if (this.item.children) {
      this.item.children.forEach(tab => {
        if (
          tab.link === '/' + this.ChildrenLink[this.lastItem] ||
          tab.link ===
            '/' +
              this.ChildrenLink[this.lastSecond] +
              '/' +
              this.ChildrenLink[this.lastItem]
        ) {
          this.expanded = true;
        }
      });
    }
  }

  /**
   * @description method to perform routing
   * @author Virendra Pandey
   * @param item object
   * @since 2019-01-11
   * @memberOf NavListComponent
   */
  onItemSelected(item) {
    window.scroll(0, 0);
    if (!item.children || !item.children.length) {
      this.router.navigate([item.link]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
