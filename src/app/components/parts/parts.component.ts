import { Component } from '@angular/core';
import { DrawingService } from 'src/app/services/drawing.service';
import { PartsService } from 'src/app/services/parts.service';
import { Parts, PartsviewService } from 'src/app/services/partsview.service';


@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss']
})
export class PartsComponent {

  displayedColumns: string[] = ['repere', 'numBobst',  'description'];
  dataSource!: Parts[];
  part!: Parts;
  active3d: boolean = false;

  constructor(private partsviewService: PartsviewService, private drawingService: DrawingService, private partsService: PartsService) {
    
    // Injection partsviewService
    //this.dataSource = partsviewService.PARTS_DATA;
    this.partsService.activeListParts.subscribe( value => {
      this.dataSource = value;
    });

    this.partsService.activePart.subscribe( value => {
      this.part = value;
    });

  }

  onActivePart(numPart: string){
    //this.partsService.activePart1(numPart);
    this.partsService.showPartFromNumPart(numPart);
    this.partsService.activeHotspotPart(numPart);
  }

  onViewDrawing(numBobst: string){
      this.drawingService.showDrawingFromItem(numBobst);
  }

  toggle3d(){
    if(this.active3d) 
      this.active3d=false;
    else
      this.active3d=true;
  }

}
