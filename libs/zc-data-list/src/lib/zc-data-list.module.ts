import { NgModule } from '@angular/core';
import { ZcDataListComponent } from './zc-data-list.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import {
  NgxDynamicTemplateModule,
  DynamicDirective
} from 'ngx-dynamic-template';
import { KeyFormatDirective } from './key-format.directive';
import { ZcDataListTableComponent } from './zc-data-list-table/zc-data-list-table.component';
import { DisplayValueFormatComponent } from './display-value-format/display-value-format.component';

import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ZcDataListFilterComponent } from './zc-data-list-filter/zc-data-list-filter.component';
import { ListboxModule } from 'primeng/listbox';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SliderModule } from 'primeng/slider';
import { ColiconsDirective } from './directives/colicons.directive';
import { ZcDataListKanbanComponent } from './zc-data-list-kanban/zc-data-list-kanban.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DragDropModule } from 'primeng/dragdrop';
import { ZcWidgetDataListService } from './zc-data-list.service';
import { PageRenderModule } from '@zc-ui/zc-page-builder';
import { DataListSharedModule } from './data-list-shared/data-list-shared.module';
import { ZcUtilitiesModule } from '@zc-ui/zc-utilities';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    TableModule,
    CommonModule,
    DataListSharedModule,
    NgxDynamicTemplateModule,
    FormsModule,
    NgbModule,
    NgbDropdownModule,
    DropdownModule,
    ListboxModule,
    CalendarModule,
    VirtualScrollerModule,
    ButtonModule,
    RadioButtonModule,
    MultiSelectModule,
    SplitButtonModule,
    SliderModule,
    InfiniteScrollModule,
    DragDropModule,
    PageRenderModule,
    ZcUtilitiesModule
  ],
  declarations: [
    ZcDataListComponent,
    KeyFormatDirective,
    ZcDataListTableComponent,
    DisplayValueFormatComponent,
    ZcDataListFilterComponent,
    ColiconsDirective,
    ZcDataListKanbanComponent
  ],
  providers: [ZcWidgetDataListService],
  exports: [ZcDataListComponent]
})
export class ZcDataListModule {}
