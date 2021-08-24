import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './dashboard/footer/footer.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './dashboard/content/content.component';
import { FormsModule } from '@angular/forms';
import { PublicacionComponent } from './dashboard/content/publicacion/publicacion.component';
import { SpinnerComponent } from './dashboard/spinner/spinner.component';
import { AmistadComponent } from './dashboard/content/amistad/amistad.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    LayoutComponent,
    ContentComponent,
    PublicacionComponent,
    SpinnerComponent,
    AmistadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
