import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PartsService } from 'src/app/services/parts.service';

@Component({
  selector: 'app-view3d',
  templateUrl: './view3d.component.html',
  styleUrls: ['./view3d.component.scss']
})
export class View3dComponent implements OnInit {

  public selected = false;
  public glbPath = `../../assets/BSA0322101500.glb`; //readonly BSA0322101500
  public aspectRatio = window.innerWidth / window.innerHeight;

  constructor(private partsService: PartsService, private http: HttpClient) { 
    
    this.partsService.activePart.subscribe( value => {
      
      if(value) {
        this.glbPath = '../../assets/' + value.numBobst + '.glb';
      }
  });
  }

  ngOnInit(): void {
  }

}
