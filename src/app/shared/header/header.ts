import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  
  constructor(private router: Router) {}

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }
}