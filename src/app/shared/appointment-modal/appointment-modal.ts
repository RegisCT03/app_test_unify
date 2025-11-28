import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  clientPhone?: string;
  clientEmail?: string;
  notes?: string;
}

@Component({
  selector: 'app-appointment-modal',
  imports: [DatePipe, CommonModule],
  templateUrl: './appointment-modal.html',
  styleUrls: ['./appointment-modal.css']
})
export class AppointmentModalComponent {
  @Input() appointment!: Appointment;
  @Output() close = new EventEmitter<void>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<string>();

  onClose(): void {
    this.close.emit();
  }

  onStatusChange(newStatus: string): void {
    this.statusChange.emit(newStatus);
  }

  onCancel(): void {
    if (confirm('¿Estás seguro de cancelar esta cita?')) {
      this.cancel.emit(this.appointment.id);
    }
  }

  getServiceIcon(): string {
    const icons: { [key: string]: string } = {
      'Masaje Deportivo': 'assets/icons/sport.svg',
      'Masaje Terapéutico': 'assets/icons/therapeutic.svg',
      'Masaje de Revisión': 'assets/icons/revision.svg',
      'Masaje Linfático': 'assets/icons/lymphatic.svg'
    };
    return icons[this.appointment.service] || 'assets/icons/sport.svg';
  }
}