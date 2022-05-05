import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/auth-response';
import { User } from 'src/app/models/user';
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


  constructor(private router: Router, private partsViewService: PartsviewService, private authService: AuthService) {
    authService.isAuthenticated().subscribe(res => {
      this.activePartsView = res;
   })

  //  authService.getUser().subscribe(user => {
  //    if (user && (user.roles[0]=='intern')){
  //     this.myPartsView.push('ZNC_BSA03802000066_017_-');            
  //     this.myPartsView.push('ZNC_BSA03802000069_017_-');
  //   } else {
  //     this.myPartsView.push('ZNC_BSA03802000066_017_-');
  //   }

  //  })
  }

  ngOnInit(): void {

    if (this.activePartsView) {
        this.myPartsView.push('ZNC_BSA03802000066_017_-');            
        this.myPartsView.push('ZNC_BSA03802000069_017_-');
      } else {
        this.myPartsView.push('ZNC_BSA03802000066_017_-');
      }
      
      console.log('mesPArtsview', this.myPartsView);
    
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
