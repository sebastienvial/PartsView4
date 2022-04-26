import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { DrawingService } from 'src/app/services/drawing.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  activePartsView: boolean = false;

  constructor(private router: Router, private drawingService: DrawingService, private authService: AuthService) {
    authService.isAuthenticated().subscribe(res => this.activePartsView = res);
  }

  acvitveSearch() {
    console.log('Active search :',this.drawingService.activeSearch.value );
    if (this.drawingService.activeSearch.value) {
      this.drawingService.activeSearch.next(false);
    } else {
      this.drawingService.activeSearch.next(true);
    }

    // if (!this.router.url.includes('search'))
    //     //this.router.navigateByUrl('/search');
    //     this.router.navigate(['/search']);
    // else
    //     this.router.navigateByUrl('/');
    
  }

  zoom(delta: number) {
    this.drawingService.onZoom(delta);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/partsview/home");
  }

}
