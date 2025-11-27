import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../pages/pages-routing-module';
import { HomeComponent } from './home/home';
import { RegisterComponent } from './register/register';
import { LoginComponent } from './login/login';

@NgModule({
  imports: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule
  ]
})
export class PagesModule { }