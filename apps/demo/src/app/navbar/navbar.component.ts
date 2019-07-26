import { Component, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  version = environment.version;

  menuItems: any = [
    {
      linkText: 'App Management',
      link: '/manage-app'
    },

    {
      linkText: 'Data list',
      children: [
        // {
        //   link: '/data-list',
        //   linkText: 'Data List'
        // },
        {
          link: '/data-list/template1',
          linkText: 'Template 1'
        },
        {
          link: '/data-list/template2',
          linkText: 'Template 2'
        },
        {
          link: '/data-list/template3',
          linkText: 'Template 3'
        },
        {
          link: '/data-list/template4',
          linkText: 'Template 4'
        },
        {
          link: '/data-list/template5',
          linkText: 'Template 5'
        },
        {
          link: '/data-list/template6',
          linkText: 'Template 6'
        },
        {
          link: '/data-list/template7',
          linkText: 'Template 7'
        },
        {
          link: '/data-list/template8',
          linkText: 'Template 8'
        },
        {
          link: '/data-list/template9',
          linkText: 'Template 9'
        },
        {
          link: '/data-list/card-template1',
          linkText: 'Card Template 1'
        },
        {
          link: '/data-list/card-template2',
          linkText: 'Card Template 2'
        },
        {
          link: '/data-list/card-template3',
          linkText: 'Card Template 3'
        },
        {
          link: '/data-list/card-template4',
          linkText: 'Card Template 4'
        },
        {
          link: '/data-list/card-template5',
          linkText: 'Card Template 5'
        },
        {
          link: '/data-list/card-template6',
          linkText: 'Card Template 6'
        },
        {
          link: '/data-list/card-template7',
          linkText: 'Card Template 7'
        },
        {
          link: '/data-list/card-template8',
          linkText: 'Card Template 8'
        }
      ]
    },
    {
      linkText: 'Form',
      children: [
        {
          link: '/form/template1',
          linkText: 'Template 1'
        },
        {
          link: '/form/template2',
          linkText: 'Template 2'
        },
        {
          link: '/form/template3',
          linkText: 'Template 3'
        },
        {
          link: '/form/template4',
          linkText: 'Template 4'
        },
        {
          link: '/form/template5',
          linkText: 'Template 5'
        }
      ]
    }
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
