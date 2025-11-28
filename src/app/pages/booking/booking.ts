import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal';
import { BookingModalComponent } from '../shared-user/booking-modal/booking-modal';
import { TimeSlotSelectorComponent } from '../../shared/time-slot-selector/time-slot-selector';
import { HeaderComponent } from '../../shared/header/header';

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, DatePipe, FooterComponent, TimeSlotSelectorComponent, BookingModalComponent, ConfirmationModalComponent, HeaderComponent],
  templateUrl: './booking.html',
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {
  selectedDate: Date = new Date();
  selectedTimeSlot: string | null = null;
  selectedService: Service | null = null;
  showServiceModal: boolean = false;
  showConfirmationModal: boolean = false;

  morningSlots: TimeSlot[] = [
    //Ejemplo, ocupa API
    { id: '1', time: '10:00am - 11:00am', available: true },
    { id: '2', time: '11:00am - 12:00pm', available: true },
    { id: '3', time: '12:00pm - 1:00pm', available: true },
    { id: '4', time: '1:00pm - 2:00pm', available: true }
  ];

  eveningSlots: TimeSlot[] = [
    //Ejemplo, ocupa API
    { id: '5', time: '4:00pm - 5:00pm', available: true },
    { id: '6', time: '5:00pm - 6:00pm', available: true },
    { id: '7', time: '6:00pm - 7:00pm', available: false },
    { id: '8', time: '7:00pm - 8:00pm', available: true }
  ];

  services: Service[] = [
    //Ejemplo, ocupa API
    {
      id: 'deportivo',
      icon: 'assets/icons/sport.svg',
      title: 'Masaje Deportivo',
      description: 'Libera tensión profunda, mejora flexibilidad y previene lesiones. Ideal para atletas y personas activas.'
    },
    {
      id: 'terapeutico',
      icon: 'assets/icons/therapeutic.svg',
      title: 'Masaje Terapéutico',
      description: 'Alivia dolores específicos y acelera la recuperación de lesiones. Técnicas personalizadas.'
    },
    {
      id: 'revision',
      icon: 'assets/icons/revision.svg',
      title: 'Masaje de Revisión',
      description: 'Evalúa tu condición muscular para crear un plan de tratamiento personalizado.'
    },
    {
      id: 'linfatico',
      icon: 'assets/icons/lymphatic.svg',
      title: 'Masaje Linfático',
      description: 'Estimula el sistema inmunológico, reduce hinchazón y promueve la eliminación de toxinas.'
    }
  ];

  ngOnInit(): void {
    // Llamar API (cargar datos del usuario)
  }

  selectTimeSlot(slotId: string): void {
    this.selectedTimeSlot = slotId;
    this.showServiceModal = true;
  }

  selectService(service: Service): void {
    this.selectedService = service;
  }

  closeServiceModal(): void {
    this.showServiceModal = false;
  }

  proceedToPayment(): void {
    if (this.selectedService) {
      this.showServiceModal = false;
      this.showConfirmationModal = true;
    }
  }

  confirmBooking(): void {
    console.log('Reserva confirmada:', {
      date: this.selectedDate,
      timeSlot: this.selectedTimeSlot,
      service: this.selectedService
    });
    // Llamar API
    alert('¡Reserva confirmada exitosamente!');
    this.showConfirmationModal = false;
  }

  printBooking(): void {
    window.print();
  }

  closeConfirmationModal(): void {
    this.showConfirmationModal = false;
  }

  getSelectedTimeSlotText(): string {
    const allSlots = [...this.morningSlots, ...this.eveningSlots];
    const slot = allSlots.find(s => s.id === this.selectedTimeSlot);
    return slot ? slot.time : '';
  }
}