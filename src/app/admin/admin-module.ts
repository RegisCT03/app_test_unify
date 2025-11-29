import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { DashboardComponent } from './dashboard/dashboard';
import { ClientsComponent } from './clients/clients';
import { ServicesComponent } from './services/services';


@NgModule({
  imports: [
    CommonModule,
    DashboardComponent,
    ClientsComponent,
    ServicesComponent,
    AdminRoutingModule
  ],
})
export class AdminModule { }
