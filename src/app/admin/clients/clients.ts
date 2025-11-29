import { Component, OnInit } from '@angular/core';
import { ClientListComponent } from '../../shared/client-list/client-list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalAppointments: number;
  lastVisit: Date;
  preferredService?: string;
}

interface Appointment {
  id: string;
  service: string;
  date: Date;
  time: string;
  status: string;
}

@Component({
  selector: 'app-clients',
  imports: [ClientListComponent, CommonModule],
  templateUrl: './clients.html',
  styleUrls: ['./clients.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  selectedClient: Client | null = null;
  clientHistory: Appointment[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  showHistory: boolean = false;

  ngOnInit(): void {
    this.loadClients();
  }
  constructor(private router: Router) {}
  backToDashboard() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/admin/dashboard']);
  }

  loadClients(): void {
    this.loading = true;
    // API (simulación de datos)
    setTimeout(() => {
      this.clients = [
        {
          id: '1',
          name: 'María González',
          email: 'maria@example.com',
          phone: '+52 961 123 4567',
          totalAppointments: 8,
          lastVisit: new Date(2025, 9, 15),
          preferredService: 'Masaje Terapéutico'
        },
        {
          id: '2',
          name: 'Juan Pérez',
          email: 'juan@example.com',
          phone: '+52 961 123 4568',
          totalAppointments: 5,
          lastVisit: new Date(2025, 9, 18),
          preferredService: 'Masaje Deportivo'
        },
        {
          id: '3',
          name: 'Ana Martínez',
          email: 'ana@example.com',
          phone: '+52 961 123 4569',
          totalAppointments: 12,
          lastVisit: new Date(2025, 9, 20),
          preferredService: 'Masaje Linfático'
        }
      ];
      this.filteredClients = [...this.clients];
      this.loading = false;
    }, 1000);
  }

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(this.searchTerm) ||
      client.email.toLowerCase().includes(this.searchTerm) ||
      client.phone.includes(this.searchTerm)
    );
  }

  onClientSelected(client: Client): void {
    this.selectedClient = client;
    console.log('Cliente seleccionado:', client);
  }

  onViewHistory(client: Client): void {
    this.selectedClient = client;
    this.loadClientHistory(client.id);
    this.showHistory = true;
  }

  loadClientHistory(clientId: string): void {
    // API (simulación de historial)
    this.clientHistory = [
      {
        id: '1',
        service: 'Masaje Terapéutico',
        date: new Date(2025, 9, 15),
        time: '10:00am - 11:00am',
        status: 'completed'
      },
      {
        id: '2',
        service: 'Masaje Deportivo',
        date: new Date(2025, 9, 10),
        time: '2:00pm - 3:00pm',
        status: 'completed'
      },
      {
        id: '3',
        service: 'Masaje Linfático',
        date: new Date(2025, 9, 5),
        time: '11:00am - 12:00pm',
        status: 'completed'
      }
    ];
  }

  closeHistory(): void {
    this.showHistory = false;
    this.selectedClient = null;
    this.clientHistory = [];
  }

  exportToExcel(): void {
    console.log('Exportando a Excel...');
    // Aquí iría la lógica de exportación
  }
}