import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

@Component({
  selector: 'app-appointment-card',
  templateUrl: './appointment-card.html',
  styleUrls: ['./appointment-card.css']
})
export class AppointmentCardComponent {
  @Input() appointment!: Appointment;
  @Output() viewDetails = new EventEmitter<Appointment>();

  onViewDetails(): void {
    this.viewDetails.emit(this.appointment);
  }

  getStatusColor(): string {
    const colors: { [key: string]: string } = {
      pending: '#f39c12',
      confirmed: '#3b5998',
      completed: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[this.appointment.status] || '#999';
  }

  getStatusText(): string {
    const texts: { [key: string]: string } = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return texts[this.appointment.status] || this.appointment.status;
  }

  getServiceIcon(): string {
    const icons: { [key: string]: string } = {
      'Masaje Deportivo': '⚽',
      'Masaje Terapéutico': '💆',
      'Masaje de Revisión': '🔍',
      'Masaje Linfático': '💧'
    };
    return icons[this.appointment.service] || '💆';
  }
}