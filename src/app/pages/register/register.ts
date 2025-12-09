import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from '../../shared/auth-layout/auth-layout';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthLayoutComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error = '';
  success = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  ngOnInit(): void {}

  private passwordsMatch(group: FormGroup) {
    const p = group.get('password')?.value;
    const c = group.get('confirmPassword')?.value;
    return p === c ? null : { passwordsMismatch: true };
  }

  onSubmit(): void {
    this.error = '';
    this.success = false;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const vals = this.registerForm.value;
    const payload = {
      firstName: vals.firstName,
      lastName: vals.lastName,
      email: vals.email,
      phone: vals.phone,
      password: vals.password
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.success = true;
        console.log('Registro exitoso, navegando a login en 2 segundos...');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: err => {
        this.error = err?.error?.message || 'Error al registrar';
        console.error('Error en registro:', err);
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}