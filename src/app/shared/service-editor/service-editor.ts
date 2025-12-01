import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


interface Service {
  id?: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-service-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './service-editor.html',
  styleUrls: ['./service-editor.css']
})
export class ServiceEditorComponent implements OnInit {
  @Input() service: Service | null = null;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() save = new EventEmitter<Service>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  serviceForm!: FormGroup;

  iconOptions = [
    { value: 'assets/icons/sport.svg', label: '⚽ Deportivo', icon: '⚽' },
    { value: 'assets/icons/therapeutic.svg', label: '💆 Terapéutico', icon: '💆' },
    { value: 'assets/icons/revision.svg', label: '🔍 Revisión', icon: '🔍' },
    { value: 'assets/icons/lymphatic.svg', label: '💧 Linfático', icon: '💧' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    if (this.service) {
      this.loadServiceData();
    }
  }

  initForm(): void {
    this.serviceForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      duration: [60, [Validators.required, Validators.min(15)]],
      price: [0, [Validators.required, Validators.min(0)]],
      icon: ['assets/icons/sport.svg', Validators.required],
      active: [true]
    });
  }

  loadServiceData(): void {
    if (this.service) {
      this.serviceForm.patchValue(this.service);
    }
  }

  onSubmit(): void {
    if (this.serviceForm.valid) {
      const serviceData: Service = {
        ...this.serviceForm.value,
        id: this.service?.id
      };
      this.save.emit(serviceData);
    } else {
      this.markFormGroupTouched(this.serviceForm);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onDelete(): void {
    if (this.service?.id && confirm('¿Estás seguro de eliminar este servicio?')) {
      this.delete.emit(this.service.id);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get title() { return this.serviceForm.get('title'); }
  get description() { return this.serviceForm.get('description'); }
  get duration() { return this.serviceForm.get('duration'); }
  get price() { return this.serviceForm.get('price'); }
  get icon() { return this.serviceForm.get('icon'); }
  get active() { return this.serviceForm.get('active'); }
}