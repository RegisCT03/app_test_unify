import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { AppointmentsComponent } from './appointments/appointments';
import { ClientsComponent } from './clients/clients';
import { ServicesComponent } from './services/services';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'services', component: ServicesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }