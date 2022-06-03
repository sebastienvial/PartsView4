import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingComponent } from './components/drawing/drawing.component';
import { HomeComponent } from './components/home/home.component';
import { View3dComponent } from './components/view3d/view3d.component';
import { AuthGuard } from './security/guards/auth.guard';
import { LoginPageComponent } from './security/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'view3d', component: View3dComponent},
  { path: 'partsview', component: DrawingComponent, canActivate: [AuthGuard]}, //prevent access to this page to unauthenticated users
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
