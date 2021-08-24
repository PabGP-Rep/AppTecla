import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './dashboard/content/content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpinnerComponent } from './dashboard/spinner/spinner.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LayoutComponent},
  {path: 'home', component: DashboardComponent, children: [
    {path: '', component: ContentComponent },
    {path: 'user/:id', component: ContentComponent },
  ]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
