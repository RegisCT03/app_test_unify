import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.html',
  styleUrls: ['./auth-layout.css']
})
export class AuthLayoutComponent {
  @Input() title: string = '';
  
  // ✅ Usamos promo1.jpeg porque sabemos que existe en tu carpeta src/assets
  @Input() decorationImage: string = 'assets/promo1.jpeg'; 
}