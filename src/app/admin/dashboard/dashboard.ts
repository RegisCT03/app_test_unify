import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { StatsCardComponent } from '../../shared/stats-card/stats-card';
import { AppointmentCardComponent } from '../../shared/appointment-card/appointment-card';

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  date: Date;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface Stats {
  title: string;
  value: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DatePipe, StatsCardComponent, AppointmentCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  selectedDate: Date = new Date();
  
  stats: Stats[] = [
    { title: 'Citas Hoy', value: 8, icon: '📅', color: '#3b5998' },
    { title: 'Pendientes', value: 3, icon: '⏳', color: '#f39c12' },
    { title: 'Completadas', value: 5, icon: '✓', color: '#27ae60' },
    { title: 'Clientes Total', value: 47, icon: '👥', color: '#9b59b6' }
  ];

  appointments: Appointment[] = [
    //API simulacion 
    {
      id: '1',
      clientName: 'Anaid Deportivo',
      service: 'Masaje Deportivo',
      date: new Date(2025, 9, 20),
      time: '10:00am - 11:00am',
      status: 'pending'
    },
    {
      id: '2',
      clientName: 'Anaid Terapéutico',
      service: 'Masaje Terapéutico',
      date: new Date(2025, 9, 20),
      time: '11:00am - 12:00pm',
      status: 'confirmed'
    }
  ];

  ngOnInit(): void {
    // API
  }

  viewAppointmentDetails(appointment: Appointment): void {
    console.log('Ver detalles:', appointment);
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      pending: '#f39c12',
      confirmed: '#3b5998',
      completed: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#999';
  }

  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      pending: 'Pendiente',
      confirmed: 'Confirmada',
      completed: 'Completada',
      cancelled: 'Cancelada'
    };
    return texts[status] || status;
  }
}