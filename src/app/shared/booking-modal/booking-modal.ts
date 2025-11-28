import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-booking-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-modal.html',
  styleUrls: ['./booking-modal.css']
})
export class BookingModalComponent {
  @Input() date!: Date;
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
}