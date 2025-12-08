import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interfaz corregida para coincidir con la del padre (BookingComponent)
export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: number; 
}

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-modal.html', 
  styleUrls: ['./booking-modal.css']
})
export class BookingModalComponent {
  @Input() date: Date = new Date(); 
  @Input() timeSlot: string = '';
  @Input() services: Service[] = []; 
  @Input() selectedService: Service | null = null;
  
  @Output() serviceSelected = new EventEmitter<Service>();
  @Output() close = new EventEmitter<void>();
  @Output() proceed = new EventEmitter<void>();

  onServiceSelect(service: Service): void {
    this.serviceSelected.emit(service);
  }

  onClose(): void {
    this.close.emit();
  }

  onProceed(): void {
    if (this.selectedService) {
      this.proceed.emit();
    }
  }

  // Helper para cerrar si se hace click en el fondo oscuro (overlay)
  onOverlayClick(): void {
    this.close.emit();
  }

  // Evita que el click dentro del modal cierre el modal
  onContentClick(event: Event): void {
    event.stopPropagation();
  }
}