import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './landing/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { StudentDashboardComponent } from './dashboard/student-dashboard/student-dashboard.component';
import { VolunteerDashboardComponent } from './dashboard/volunteer-dashboard/volunteer-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'student-dashboard',
    component:StudentDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'volunteer-dashboard',
    component:VolunteerDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'events',
    component:EventListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
