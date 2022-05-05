import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { DrawingService } from 'src/app/services/drawing.service';
import { PartsviewService } from 'src/app/services/partsview.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  activePartsView: boolean = false;

  constructor(private router: Router, private partsViewService: PartsviewService, private drawingService: DrawingService, private authService: AuthService) {
    authService.isAuthenticated().subscribe(res => {
      if (res) {
        partsViewService.partsViewNumber.subscribe(res =>{
          if (res.length>1) this.activePartsView = true;
        }) 

      }
      
    });
    

  }

  acvitveSearch() {
    console.log('Active search :',this.drawingService.activeSearch.value );
    if (this.drawingService.activeSearch.value) {
      this.drawingService.activeSearch.next(false);
    } else {
      this.drawingService.activeSearch.next(true);
    }
  }

  toggleNav(snav): void {
    snav.toggle();    
  }

  zoom(delta: number) {
    this.drawingService.onZoom(delta);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/partsview/home");
  }

}
