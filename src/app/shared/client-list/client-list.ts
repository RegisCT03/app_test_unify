import { Component, Input, Output, EventEmitter } from '@angular/core';
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

@Component({
  selector: 'app-client-list',
  imports: [CommonModule],
  templateUrl: './client-list.html',
  styleUrls: ['./client-list.css']
})
export class ClientListComponent {
  @Input() clients: Client[] = [];
  @Input() loading: boolean = false;
  @Output() clientSelected = new EventEmitter<Client>();
  @Output() viewHistory = new EventEmitter<Client>();

  onSelectClient(client: Client): void {
    this.clientSelected.emit(client);
  }

  onViewHistory(client: Client, event: Event): void {
    event.stopPropagation();
    this.viewHistory.emit(client);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}