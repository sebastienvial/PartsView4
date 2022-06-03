import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSplitModule } from 'angular-split';
import { NgxThreeModule } from 'ngx-three';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawingComponent } from './components/drawing/drawing.component';
import { HomeComponent } from './components/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { NavigationDynamicComponent } from './components/navigation-dynamic/navigation-dynamic.component';
import { PartsComponent } from './components/parts/parts.component';
import { SearchComponent } from './components/search/search.component';
import { View3dComponent } from './components/view3d/view3d.component';
import { SecurityModule } from './security/security.module';
import { PartsviewService } from './services/partsview.service';





@NgModule({
  declarations: [
    AppComponent,
    NavigationDynamicComponent,
    DrawingComponent,
    PartsComponent,
    MainNavComponent,
    SearchComponent,
    HomeComponent,
    View3dComponent
  ],
  imports: [
    MatDialogModule,
    AngularSplitModule,
    MatTableModule,
    MatIconModule,
    MatTreeModule,
    MatProgressBarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    SecurityModule,
    NgxThreeModule
  ],
  providers: [
    PartsviewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
