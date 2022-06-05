import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-response';
import { AuthService } from 'src/app/security/auth.service';
import { PartsviewService } from 'src/app/services/partsview.service';

const STORAGE_KEY = "auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  activePartsView: boolean = false;

  myPartsView: string[] = [];
  homeImg: String = '../../assets/MASTERFOLD 110.jpg'; 
  lastUser!: AuthResponse;

  constructor(private router: Router, private partsViewService: PartsviewService, private authService: AuthService) {
    authService.isAuthenticated().subscribe(res => {
      console.log("subsribtion de isAuthen", res );
      this.activePartsView = res;
   })
  }

  ngOnInit(): void {

    const lastUser = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}'
    ) as AuthResponse;

    console.log('ngOninit-HOME', lastUser.token);
    if (lastUser.token != undefined) {
    //In prod the request must be done on DB , customer table (futur dev)
    if (lastUser.user.role.includes("intern")) {
        this.myPartsView.push('ZNC_BSA03802000066_017_-');            
        this.myPartsView.push('ZNC_BSA03802000080_017_-');
      } else {
        this.myPartsView.push('ZNC_BSA03802000066_017_-');
      }
    } 
  }

  getUserAuthenticated(): AuthResponse {
    let savedAuth = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '{}'
    ) as AuthResponse;
    return savedAuth;
  }

  showPartsView(numPartsView: string) {
    this.partsViewService.partsViewNumber.next(numPartsView);
    this.router.navigateByUrl("/partsview");
    

  }
}
