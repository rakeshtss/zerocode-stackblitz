import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zc-block-tree-node',
  templateUrl: './block-tree-node.component.html',
  styleUrls: ['./block-tree-node.component.scss']
})
export class BlockTreeNodeComponent implements OnInit {
  @Input() pageBlocks: any[] = [];
  constructor() { }
  ngOnInit() { }

  /**
   * @description checkBlockConditions(widget.definition)
   * @author T Rakesh Kumar
   * @date 2019-04-26
   * @param Object blockProp
   * @returns boolean
   */
  checkBlockConditions(blockProp) {
    if (blockProp && blockProp.hidden) {
      try {
        const fun = new Function('return ' + blockProp.hidden + ';');
        return fun();
      } catch (error) {
        return false;
      }
    }
    return true;
  }

}
