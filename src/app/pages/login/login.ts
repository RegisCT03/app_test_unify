import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthLayoutComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.error = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const vals = this.loginForm.value;
    this.auth.login(vals.email, vals.password).subscribe({
      next: (res) => {
        console.log('Login response:', res);
        // La respuesta ES el usuario + token (res.id, no res.user.id)
        if (res && res.id === 1) {
          console.log('Usuario admin (id=1) detectado, redirigiendo a /admin');
          this.router.navigate(['/admin']);
        } else {
          console.log('Usuario regular detectado, redirigiendo a /booking');
          this.router.navigate(['/booking']);
        }
      },
      error: err => this.error = err?.error?.message || 'Credenciales inválidas'
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
  
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}