import { Component, OnInit, Input } from '@angular/core';

import { Router } from '@angular/router';
import { ZcWidgetDataListService } from '../zc-data-list.service';
@Component({
  selector: 'zc-data-list-kanban',
  templateUrl: './zc-data-list-kanban.component.html',
  styleUrls: ['./zc-data-list-kanban.component.scss']
})
export class ZcDataListKanbanComponent implements OnInit {
  @Input() options: any;
  @Input() dataList: any;

  kanbanGrids: any = [];
  kanbanGridsList: any = [];
  stages: any = [];
  allItems: any = [];
  draggedItem: any;
  dragGridIndex: any;
  dragItemIndex: any;
  droppedGridIndex: any;
  showGrid = false;
  totalRecords: any;
  rows = 10;
  page = 1;
  globalFilter = '';
  kanbanCols: any = [];
  constructor(
    private zcDataListService: ZcWidgetDataListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getColsList();
  }

  getColsList() {
    this.zcDataListService
      .getDataList(this.options.properties.kanban.dataSource, {})
      .subscribe(res => {
        this.kanbanGrids = res;
        this.kanbanGridsList = res;
        this.formatKanbanGrid();
        this.getDataList('');
      });
  }

  formatKanbanGrid() {
    if (this.kanbanGrids && this.kanbanGrids.length > 0) {
      this.kanbanGrids.forEach(grid => {
        grid['items'] = [];
        grid['page'] = 1;
        this.stages.push(grid);
      });
    }
  }

  getDataList(stage) {
    this.zcDataListService
      .getDataList(this.options.properties.dataSource, {})
      .subscribe(res => {
        if (res) {
          this.dataList = res.data.listData.rows;
          if (this.dataList) {
            this.dataList.forEach(item => {
              this.allItems = [...this.allItems, item];
              if (this.kanbanGrids) {
                this.kanbanGrids.forEach(grid => {
                  if (
                    this.getItemValue(
                      this.options.properties.kanban.field,
                      item
                    ) === grid.uid
                  ) {
                    grid.items.push(item);
                  }
                });
              } else {
                this.kanbanGrids = this.allItems;
              }
            });
          }
          this.showGrid = true;
        }
      });
  }

  loadmore(search) {
    this.page += 1;
    if (search) {
      this.page = 1;
      this.allItems = [];
      this.stages = [];
      this.formatKanbanGrid();
    }
    this.getDataList('');
  }

  onScroll(stage) {
    /* this.stages = [];
    this.stages.push(stage);
    stage.page = stage.page + 1;
    console.log('stage', stage);
    this.getDataList(stage); */
  }

  getItemValue(key, item) {
    const colKey = 'item.' + key;
    const fun = new Function('item', 'return ' + colKey + ' ; ');
    return fun(item);
  }

  dragStart(event, task, dragGridIndex, dragTaskIndex) {
    /* console.log('dragStart event', event);
    console.log('dragGridIndex', dragGridIndex);
    console.log('dragTaskIndex', dragTaskIndex); */
    this.dragGridIndex = dragGridIndex;
    this.dragItemIndex = dragTaskIndex;
    this.draggedItem = task;
  }

  drop(event, dropIndex) {
    /* console.log('drop event', event);
    console.log('drop Index', dropIndex);
    console.log('this.kanbanGrids[this.dragGridIndex]', this.kanbanGrids[this.dragGridIndex]); */
    let flg = false;
    let flag = true;
    const kanban = this.options.properties.kanban;
    if (kanban.dropConfirmation.needConfirmation) {
      flg = kanban.dropConfirmation.needConfirmation;
    }
    if (flg) {
      flag = confirm(kanban.dropConfirmation.confirmMsg);
    }
    if (flag) {
      this.droppedGridIndex = dropIndex;
      if (this.dragGridIndex !== this.droppedGridIndex) {
        if (this.draggedItem) {
          this.kanbanGrids[this.dragGridIndex]['items'].splice(
            this.dragItemIndex,
            1
          );
          this.kanbanGridsList.forEach(item => {
            if (
              item.uid ===
              this.draggedItem[this.options.properties.kanban.field]
            ) {
              this.draggedItem.push(item);
            }
          });
          this.kanbanGrids[this.droppedGridIndex].items.push(this.draggedItem);
          this.draggedItem = null;
        }
      }
    }
  }

  dragEnd(event) {
    /* console.log('dragEnd event', event); */
    this.draggedItem = null;
  }
  redirectPage(uid) {}
}
