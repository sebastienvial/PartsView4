import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/security/auth.service';
import { PartsviewService } from 'src/app/services/partsview.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  activePartsView: boolean = false;

  constructor(private router: Router, private partsViewService: PartsviewService, private authService: AuthService) {
    authService.isAuthenticated().subscribe(res => {
      this.activePartsView = res;
    })
   }

  ngOnInit(): void {
  }

  showPartsView(numPartsView: string) {
    this.partsViewService.partsViewNumber.next(numPartsView);
    this.router.navigateByUrl("/partsview");
  }
}
