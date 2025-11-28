import { Routes } from '@angular/router';
import { HomeComponent } from './app/pages/home/home';
import { LoginComponent } from './app/pages/login/login';
import { RegisterComponent } from './app/pages/register/register';
import { BookingComponent } from './app/pages/booking/booking';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'booking', component: BookingComponent }
];
