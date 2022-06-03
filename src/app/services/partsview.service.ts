import { BehaviorSubject } from "rxjs";


/**
 * Equipment/Machine data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface EquipmentNode {
    name: string;
    id: string;
    parentId: string;
    drawing?: string;
    path?: string;
    children?: EquipmentNode[];
   }


 /** EquipmentFlatNode with expandable and level information 
*  and caracteristik needed for the naviagtion.
*  The private -transformer need to return all the attributs of the interface below
*/
export interface EquipmentFlatNode {
 expandable: boolean;
 name: string;
 parentId: string;
 id: string;
 drawing: string;
 level: number;
}

export interface Parts {
    numBobst: string;
    repere: number;
    contentType: string;
    description: string;
    note: string;
  }


export class PartsviewService {

  public treeData: EquipmentNode[] = [];
  public partsViewNumber: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public partsViewReset: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
      
}