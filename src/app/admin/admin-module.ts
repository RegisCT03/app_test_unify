import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { DashboardComponent } from './dashboard/dashboard';


@NgModule({
  imports: [
    CommonModule,
    DashboardComponent,
    AdminRoutingModule
  ]
})
export class AdminModule { }
