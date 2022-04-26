import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parts } from './partsview.service';

@Injectable({
  providedIn: 'root'
})

export class PartsService {

  private part!: Parts;
  private parts_data!: Parts[];
  private apiUrl = environment.apiUrl;

  public activeListParts: BehaviorSubject<Parts[]> = new BehaviorSubject<Parts[]>(new Array<Parts>());
  public activePart: BehaviorSubject<Parts> = new BehaviorSubject<Parts>(this.part);  

  constructor(private http: HttpClient) { }

  getParts(page: string): Observable<Parts[]> {
    return this.http.get<Parts[]> (this.apiUrl + '/catPartsPageContent/' + page);
  }

  showParts(drawing:string) {
    // Request Parts containing in the drawing
    console.log ('Begin showParts'); //à supprimer
    let page: string = drawing.substring(0,drawing.indexOf('.'));

    this.getParts(page).subscribe( (response) => {
      this.parts_data = response;
      this.activeListParts.next(this.parts_data);  
      this.activePart.next(this.parts_data[0]);
    } );
  }


  showPart(repere: number) {
      for (let part of this.parts_data) {
          if (part.repere === repere) {
              this.activePart.next(part);
          }
      }
  }

  showPartFromNumPart(numPart: string) {
    console.log('ShowPartFrom NUmPart',numPart);
    let nPart = numPart;

    const eleRacine = 'PCR0380'; //recherche dans la base select item_toc from cat_bom where ...
    let res = nPart.match(/(E\d\d)$/g);
    if (res)
    if ( (res.length>0) && (nPart.length<4) ){
      nPart = eleRacine + nPart;
    }

    for (let part of this.parts_data) {
        if (part.numBobst === nPart) {
            this.activePart.next(part);
        }

    }
  }

  activeHotspotPart(numPart: string) {
    console.log('ActiveHotspot',numPart);
    let obj = document.getElementById('drawing') as HTMLObjectElement;
    let objWin = obj.contentWindow;
    let res = numPart.match(/(E\d\d)$/g);
    if (res) {
      if (res?.length > 0){
        objWin?.postMessage(numPart.substring(numPart.length-3,),"*"); 
      }
    } else {
      objWin?.postMessage(numPart,"*");
    }
  }

}
