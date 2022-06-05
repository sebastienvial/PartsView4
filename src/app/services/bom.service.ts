import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DynamicFlatNode } from '../components/navigation-dynamic/navigation-dynamic.component';
import { EquipmentNode, PartsviewService } from './partsview.service';

@Injectable({
  providedIn: 'root'
})

export class BomService {
  
  public pathToExpand: BehaviorSubject<string> = new BehaviorSubject<string>("") 

  private idDoc: string = "";  
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private partsviewService: PartsviewService) { 
    partsviewService.partsViewNumber.subscribe(res => {
      this.idDoc = res;
    });
  }

  getBomDynamic(idDoc: string, idParent: string): Observable<DynamicFlatNode[]> {
    return this.http.get<DynamicFlatNode[]> (this.apiUrl + '/bomd/' + this.idDoc + '/' + idParent);
  }

  getChildrenDynamic(node: string): Observable<DynamicFlatNode[]> {
    return this.http.get<DynamicFlatNode[]> (this.apiUrl + '/bomd/' + this.idDoc + '/' + node);
  }

  getNodesSearch(searchTerm: string): Observable<EquipmentNode[]> {
    return this.http.get<EquipmentNode[]> (this.apiUrl + '/search/' + this.idDoc + '/' + searchTerm);
  }

  getPathNode(idDoc: string, idToc: string, idParent: string) : Observable<string[]> {
    return this.http.get<string[]> (this.apiUrl + '/bomPath/' + this.idDoc + '/' + idParent + '/' + idToc);
  }

  expandNode(path: string) {
    this.pathToExpand.next(path);
  }

}




