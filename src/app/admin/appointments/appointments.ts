import { Component, OnInit } from '@angular/core';
import { AppointmentCardComponent } from '../../shared/appointment-card/appointment-card.js';
import { AppointmentModalComponent } from '../../shared/appointment-modal/appointment-modal';
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
  selector: 'app-appointments',
  standalone: true,
  imports: [AppointmentModalComponent, CommonModule, AppointmentCardComponent],
  templateUrl: './appointments.html',
  styleUrls: ['./appointments.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  filteredAppointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  showModal: boolean = false;
  filterStatus: string = 'all';
  searchTerm: string = '';

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    // API (Simulación de datos)
    this.appointments = [
      {
        id: '1',
        clientName: 'Anaid Deportivo',
        service: 'Masaje Deportivo',
        date: new Date(2025, 9, 20),
        time: '10:00am - 11:00am',
        status: 'pending',
        clientPhone: '+52 961 123 4567',
        clientEmail: 'anaid@example.com',
        notes: 'Primera sesión'
      },
      {
        id: '2',
        clientName: 'Anaid Terapéutico',
        service: 'Masaje Terapéutico',
        date: new Date(2025, 9, 20),
        time: '11:00am - 12:00pm',
        status: 'confirmed',
        clientPhone: '+52 961 123 4568',
        clientEmail: 'terapeutico@example.com'
      },
      {
        id: '3',
        clientName: 'Cliente Completado',
        service: 'Masaje Linfático',
        date: new Date(2025, 9, 19),
        time: '4:00pm - 5:00pm',
        status: 'completed',
        clientPhone: '+52 961 123 4569',
        clientEmail: 'completado@example.com'
      }
    ];
    this.filteredAppointments = [...this.appointments];
  }

  filterByStatus(status: string): void {
    this.filterStatus = status;
    this.applyFilters();
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredAppointments = this.appointments.filter(apt => {
      const matchesStatus = this.filterStatus === 'all' || apt.status === this.filterStatus;
      const matchesSearch = apt.clientName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           apt.service.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }

  viewDetails(appointment: Appointment): void {
    this.selectedAppointment = appointment;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedAppointment = null;
  }

  onStatusChange(newStatus: string): void {
    if (this.selectedAppointment) {
      const index = this.appointments.findIndex(a => a.id === this.selectedAppointment!.id);
      if (index !== -1) {
        this.appointments[index].status = newStatus as any;
        this.applyFilters();
      }
    }
    this.closeModal();
  }

  onCancelAppointment(id: string): void {
    const index = this.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      this.appointments[index].status = 'cancelled';
      this.applyFilters();
    }
    this.closeModal();
  }

  getStatusCount(status: string): number {
    if (status === 'all') return this.appointments.length;
    return this.appointments.filter(a => a.status === status).length;
  }
}