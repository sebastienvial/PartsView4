import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DynamicFlatNode } from '../components/navigation-dynamic/navigation-dynamic.component';
import { BomService } from './bom.service';
import { PartsService } from './parts.service';
import { PartsviewService } from './partsview.service';

@Injectable({
  providedIn: 'root'
})

export class DrawingService {
  
  
  public svgServer: string = environment.svgUrl;


  public activeSvg: BehaviorSubject<string> = new BehaviorSubject<string>("")     
  
  public svgDrawingPages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([""]);
  public activeButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public activeSearch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  private idDoc: string = "";
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private bomService: BomService, private partsService: PartsService, private partsviewService: PartsviewService) {
    partsviewService.partsViewNumber.subscribe(res =>{
      this.idDoc = res;
    });
   }


  getDrawings(idE43: string): Observable<string[]> {
    return this.http.get<string[]> (this.apiUrl + '/drawingsE43/' + idE43);
  }

  getDrawingFromItem(idItem: string): Observable<string[]>{
    return this.http.get<string[]> (this.apiUrl + '/drawing/' + this.idDoc + '/' + idItem);
  }

  showDrawingFromItem(idItem: string) {
     this.getDrawingFromItem(idItem).subscribe((res) => { 
       console.log('Res de la recherche de dessin', res); 
       if(res.length>0){
        console.log('Show dessin', res); 
         this.showDrawing(res[0]+'.svg');
         //this.partsService.showParts(res[0]+'.svg');
       } else {
         //if is not a drawing is a Part         
        console.log('Show PartFromNumpart', res);
         this.partsService.showPartFromNumPart(idItem);
       }        
    })
  }

  showDrawing(drawing:string) {
    this.getDrawings(drawing.substring(0,drawing.lastIndexOf('_'))).subscribe( (response) => {
      if (response.length>1) {
         this.activeButton.next(true);
         response.sort();
         this.svgDrawingPages.next(response);
       } else {
         this.activeButton.next(false);
       }

       this.activeSvg.next(this.svgServer + drawing);
       this.partsService.showParts(drawing);

    })  
  }

  showElement(strTooltip: string) {
    //search racine
    console.log('showelement0', strTooltip);
    this.bomService.getBomDynamic(this.idDoc,'M').subscribe(res => {
      let idParent = res[0].item;
      console.log('showelement1',idParent);
      this.bomService.getBomDynamic(this.idDoc,idParent).subscribe(res => {
        
      console.log('showelement2',res);
        for (let i=0; i<res.length; i++) {
          if (res[i].item.includes(strTooltip)){
            
            console.log('showelement3',res[i].item);
            console.log('showElement4',idParent);
            this.bomService.getPathNode(this.idDoc,res[i].item,idParent).subscribe(path => {
              //open navigation on element
              console.log('ShowElement5', path);
              this.bomService.expandNode(path[0]);
            })
          }
        }
      })
    })    
  }

  onZoom(delta:number) {   
    var obj = document.getElementById('drawing');
    var w = obj?.getAttribute('width');
    if (w) {
      var iw = parseInt(w?.substring(0,w?.length-1)) + delta;
      obj?.setAttribute('width', iw.toString()+'%');
    } 
        
  }

}


