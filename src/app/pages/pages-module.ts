import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './pages-routing-module';
import { HomeComponent } from './home/home';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';
import { BookingComponent } from './booking/booking';
import { SharedModule } from '../shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BookingComponent
  ],
})
export class PagesModule { }