import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationDynamicComponent } from './components/navigation-dynamic/navigation-dynamic.component'
import { DrawingComponent } from './components/drawing/drawing.component';
import { PartsComponent } from './components/parts/parts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { AngularSplitModule } from 'angular-split';
import { PartsviewService } from './services/partsview.service';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { SecurityModule } from './security/security.module';
import { HomeComponent } from './components/home/home.component';
import { View3dComponent } from './components/view3d/view3d.component';
import { NgxThreeModule } from 'ngx-three';

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
