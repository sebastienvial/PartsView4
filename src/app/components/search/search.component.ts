import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BomService } from 'src/app/services/bom.service';
import { DrawingService } from 'src/app/services/drawing.service';
import { PartsService } from 'src/app/services/parts.service';
import { PartsviewService } from 'src/app/services/partsview.service';
import { EquipmentNode } from 'src/app/services/partsview.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  dataSource!: EquipmentNode[];
  displayedColumns: string[] = ['Parent', 'Material', 'Description', 'Drawing'];
  value: string = '';

  constructor(private partsViewService: PartsviewService, private bomService: BomService, private drawingService:DrawingService, private partsService: PartsService, private router: Router ) { }

  ngOnInit(): void {
  }

  onSearch(searchTerm: string) {
    console.log('Debut search :', searchTerm );
    this.bomService.getNodesSearch(searchTerm).subscribe( res => {
      this.dataSource = res;
      console.log('Resultat de la recherche :',this.dataSource);
    });
  }

  onShowDrawing(searchNode: EquipmentNode) {
    if(searchNode.drawing){
      //Show drawing
      this.drawingService.showDrawing(searchNode.drawing);
      //Show Parts of drawing
      //this.partsService.showParts(searchNode.drawing);     
      //Open navigaation
      if (searchNode.path) {
        this.partsViewService.partsViewReset.next(true);
        this.bomService.pathToExpand.next(searchNode.path);
      }
    } else {
      this.drawingService.showDrawingFromItem(searchNode.parentId);
      
      if (this.drawingService.activeSvg.getValue().includes(searchNode.parentId)){
        //show active parts on drawing and on partlist
       this.partsService.showPartFromNumPart(searchNode.id);
       console.log('debug001',this.drawingService.activeSvg.getValue() );
       this.partsService.activeHotspotPart(searchNode.id);
       if (searchNode.path) this.bomService.pathToExpand.next(searchNode.path);
      }
       
      
    }
  }

}
