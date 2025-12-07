import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.html',
  styleUrls: ['./auth-layout.css']
})
export class AuthLayoutComponent {
  @Input() title: string = '';
  
  @Input() decorationImage: string = 'assets/images/promo1.jpeg'; 
}