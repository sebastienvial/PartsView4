import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view3d',
  templateUrl: './view3d.component.html',
  styleUrls: ['./view3d.component.scss']
})
export class View3dComponent implements OnInit {
  public selected = false;
  public readonly glbPath = `../../assets/BSA0322101500.glb`; //BSA0322101501
  public aspectRatio = window.innerWidth / window.innerHeight;

  constructor() { }

  ngOnInit(): void {
  }

}
