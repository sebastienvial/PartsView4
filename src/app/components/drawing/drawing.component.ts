import { Component, OnInit } from '@angular/core';
import { Parts, PartsviewService } from 'src/app/services/partsview.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PartsService } from 'src/app/services/parts.service';
import { DrawingService } from 'src/app/services/drawing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit {

  svgDrawing!: SafeResourceUrl;
  svgDrawingPages!: string[];
  activeButton: boolean = true;
  activeSearch: boolean = false;
  value: number = 100;

  posX:number = 0;
  posY:number = 0;
  source: Window | undefined;

  private apiUrl: string = environment.apiUrl;

  constructor(private partsViewService: PartsviewService, private drawingService: DrawingService, private partsService: PartsService, private sanitizer: DomSanitizer, private dialog: MatDialog) { 

    // Subscribe here, this will automatically update "svgDrawing" whenever a change to the subject is made.
    this.drawingService.activeSvg.subscribe( value => {
      this.svgDrawing = this.sanitizer.bypassSecurityTrustResourceUrl(value);
    });

    this.drawingService.svgDrawingPages.subscribe( value => {
      this.svgDrawingPages = value;
    })

    this.drawingService.activeButton.subscribe( value => {
      this.activeButton = value
    })

    this.drawingService.activeSearch.subscribe( value => {
      this.activeSearch = value
    })
    

   }

  ngOnInit(): void {

    // resize drawing onInit
    this.onResize(null);

    const displayMessage =  (evt) => {

      this.posX = evt.data[1];
      this.posY = evt.data[0];
      var id:number = evt.data[2];
      var strTooltip:string = evt.data[3];
      var typeMessage:string = evt.data[4];

      var message;
      if (evt.origin !== this.apiUrl) {
        message = "You are not authorized";
      } else {
        if ((typeMessage=='show') || true ) {
          this.partsService.showPartFromNumPart(strTooltip);
        } 
        if(typeMessage=='click') {
          console.log('je viens de cliquer sur ', strTooltip);
          //control if parts or GOC or Element
          let res = strTooltip.match(/(E\d\d)$/g);
          if (res) {
            //Element Exx  -> Open navigation to the element
            console.log('Open element', strTooltip);
            this.partsViewService.partsViewReset.next(true);
            //search element
            this.drawingService.showElement(strTooltip);

          } else {

              console.log('ShowDrawing from item :', strTooltip);
              this.drawingService.showDrawingFromItem(strTooltip);
          }
                  
        }
        
      }
      
    }
      
    if (window.addEventListener) {
      // For standards-compliant web browsers
      window.addEventListener("message", displayMessage, false);
    }
    
  }

  onResize(event) {
    var obj = document.getElementById('drawing');
    obj?.setAttribute('width','100%');
  }

  activeHotspot(numPart: string) {
    console.log('ActiveHotspot');
    let obj = document.getElementById('drawing') as HTMLObjectElement;
    let objWin = obj.contentWindow;
    objWin?.postMessage(numPart,"*");
  }

  onViewDrawing(page: string) {
    console.log('afficher page : ', page);
    var drawing = page + '.svg';
    this.drawingService.showDrawing(drawing);
    //this.partsService.showParts(drawing);
  }
}