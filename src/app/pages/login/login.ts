import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthLayoutComponent, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Formulario válido:', this.loginForm.value);
      // Aquí iría la lógica de autenticación (API call)
      alert('Inicio de sesión exitoso');
      this.router.navigate(['/']);
    } else {
      this.markFormGroupTouched(this.loginForm);
      alert('Por favor, completa todos los campos correctamente');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}