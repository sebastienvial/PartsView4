import { CollectionViewer, SelectionChange, DataSource } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';

import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, merge, Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { BomService } from 'src/app/services/bom.service';
import { DrawingService } from 'src/app/services/drawing.service';
import { PartsService } from 'src/app/services/parts.service';
import { PartsviewService } from 'src/app/services/partsview.service';

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(
    public item: string,
    public designation: string,
    public drawing?: string,
    public level = 1,
    public expandable = false,
    public isLoading = false,
  ) {}
}

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */
@Injectable({providedIn: 'root'})
export class DynamicDatabase {
  
  private idDoc: string ="";

  constructor(private partsViewService: PartsviewService, private bomService: BomService) {
    partsViewService.partsViewNumber.subscribe(res =>{
      this.idDoc = res;
    });
   }


  getChildren(node: string): Promise<DynamicFlatNode[]> {
    return lastValueFrom(this.bomService.getBomDynamic(this.idDoc,node));
  }

  isExpandable(node: string): boolean {
    //return this.dataMap.has(node);
    return true;
  }
}


export class DynamicDataSource implements DataSource<DynamicFlatNode> {
  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] {
    return this.dataChange.value;
  }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(
    private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase,
  ) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if (
        (change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed
      ) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(collectionViewer: CollectionViewer): void {}

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed
        .slice()
        .reverse()
        .forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
   async toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = await this._database.getChildren(node.item);
    const index = this.data.indexOf(node);
    if (!children || index < 0) {
      // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(
          dfn => new DynamicFlatNode(dfn.item, dfn.designation, dfn.drawing, node.level + 1, this._database.isExpandable(dfn.item)),
        );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (
          let i = index + 1;
          i < this.data.length && this.data[i].level > node.level;
          i++, count++
        ) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 500);
  }
}

/**
 * @title Tree with dynamic data
 */
 @Component({
  selector: 'app-navigation-dynamic',
  templateUrl: './navigation-dynamic.component.html', 
  styleUrls: ['./navigation-dynamic.component.scss']
 })
export class NavigationDynamicComponent {

  private idDoc: string = "";

  constructor(database: DynamicDatabase, private partsViewService: PartsviewService, private bomService: BomService, private drawingService: DrawingService, private partsService: PartsService, private router: Router) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);
    
    this.partsViewService.partsViewNumber.subscribe(res =>{
        this.idDoc = res;
        this.initRootLevel();
        
    })
    
    // Initialize root Level
    // this.bomService.getBomDynamic(this.idDoc,'M').subscribe( response => {
    //   this.dataSource.data = response.map(node => new DynamicFlatNode(node.item, node.designation, node.drawing, 0, true));
    // }); 

    this.bomService.pathToExpand.subscribe(path => {
      this.expandNode(path);
    })

    this.partsViewService.partsViewReset.subscribe(res => {
      if (res) this.resetNode();
    })

  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  activeNode: string = '';

  initRootLevel () {
    if (this.idDoc!="")
    this.bomService.getBomDynamic(this.idDoc,'M').subscribe( response => {
      this.dataSource.data = response.map(node => new DynamicFlatNode(node.item, node.designation, node.drawing, 0, true));
    });
  }

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  onNaviguer(drawing: string, item: string) { 
    console.log('Show Drawing :', drawing , ' item : ', item);
    this.activeNode = item; 
    this.drawingService.showDrawing(drawing);  
    //this.partsService.showParts(drawing);
  }

  resetNode(){
    if (this.treeControl.dataNodes.length>1) {
      console.log('reset', this.treeControl.dataNodes.length )
      this.treeControl.toggle(this.treeControl.dataNodes[0]);
    }

  }

  expandNode(path: string) {
    if (path!="") {
      const pathCompo = path.split('|');
      let j:number = 1;

      this.treeControl.toggle(this.treeControl.dataNodes[0]);
      this.dataSource.dataChange.subscribe( dfnTab => {
        for (let i=0; i<dfnTab.length; i++) {
          if ( dfnTab[i].item == pathCompo[j] ) {
            j++;
            this.treeControl.toggle(this.dataSource.data[i]);
            this.activeNode = this.dataSource.data[i].item;
          }
        } 
      })
    }
  }

  


}
