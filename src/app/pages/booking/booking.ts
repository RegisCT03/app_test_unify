import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal';
import { BookingModalComponent } from '../../shared/booking-modal/booking-modal';
import { TimeSlotSelectorComponent } from '../../shared/time-slot-selector/time-slot-selector';
import { HeaderComponent } from '../../shared/header/header';


export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: number; 
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule, 
    DatePipe, 
    FooterComponent, 
    TimeSlotSelectorComponent, 
    BookingModalComponent, 
    ConfirmationModalComponent, 
    HeaderComponent
  ],
  templateUrl: './booking.html', 
  styleUrls: ['./booking.css']
})
export class BookingComponent implements OnInit {
  selectedDate: Date = new Date();
  selectedTimeSlot: string | null = null;
  selectedService: Service | null = null;
  
  // Variables de estado para controlar qué modal se ve
  showServiceModal: boolean = false;
  showConfirmationModal: boolean = false;

  morningSlots: TimeSlot[] = [
    { id: '1', time: '10:00am - 11:00am', available: true },
    { id: '2', time: '11:00am - 12:00pm', available: true },
    { id: '3', time: '12:00pm - 1:00pm', available: true },
    { id: '4', time: '1:00pm - 2:00pm', available: true }
  ];

  eveningSlots: TimeSlot[] = [
    { id: '5', time: '4:00pm - 5:00pm', available: true },
    { id: '6', time: '5:00pm - 6:00pm', available: true },
    { id: '7', time: '6:00pm - 7:00pm', available: false },
    { id: '8', time: '7:00pm - 8:00pm', available: true }
  ];

  
  services: Service[] = [
    {
      id: 'deportivo',
      icon: 'assets/icons/deportivo.svg',
      title: 'Masaje Deportivo',
      description: 'Libera tensión profunda, mejora flexibilidad y previene lesiones. Ideal para atletas y personas activas.',
      price: 50
    },
    {
      id: 'terapeutico',
      icon: 'assets/icons/terapeutico.svg',
      title: 'Masaje Terapéutico',
      description: 'Alivia dolores específicos y acelera la recuperación de lesiones. Técnicas personalizadas.',
      price: 55
    },
    {
      id: 'revision',
      icon: 'assets/icons/revision.svg',
      title: 'Masaje de Revisión',
      description: 'Evalúa tu condición muscular para crear un plan de tratamiento personalizado.',
      price: 45
    },
    {
      id: 'linfatico',
      icon: 'assets/icons/lymphatic.svg',
      title: 'Masaje Linfático',
      description: 'Estimula el sistema inmunológico, reduce hinchazón y promueve la eliminación de toxinas.',
      price: 60
    }
  ];

  ngOnInit(): void {
    // Aquí puedes cargar datos iniciales si vienen de una API
  }

  // 1. Al seleccionar horario, abrimos el modal de servicios
  selectTimeSlot(slotId: string): void {
    this.selectedTimeSlot = slotId;
    this.showServiceModal = true; // Esto activa el *ngIf en el HTML
  }

  // 2. Al seleccionar un servicio dentro del modal
  // CORRECCIÓN: Usamos 'any' aquí para evitar el error de conflicto de tipos (TS2345)
  // entre la interfaz local 'Service' (con price) y la del modal (posiblemente sin price).
  selectService(service: any): void {
    this.selectedService = service;
  }

  // 3. Cerrar modal de servicios (botón "Regresar" o click fuera)
  closeServiceModal(): void {
    this.showServiceModal = false;
    this.selectedService = null; // Opcional: limpiar selección al cerrar
  }

  // 4. Proceder al pago (cierra modal de servicio, abre modal confirmación)
  proceedToPayment(): void {
    if (this.selectedService) {
      this.showServiceModal = false;
      
      // Pequeño timeout para dar sensación de transición fluida (opcional)
      setTimeout(() => {
        this.showConfirmationModal = true;
      }, 100);
    }
  }

  // 5. Confirmación final
  confirmBooking(): void {
    console.log('Reserva confirmada:', {
      date: this.selectedDate,
      timeSlot: this.getSelectedTimeSlotText(),
      service: this.selectedService
    });
    
    // Aquí iría tu llamada a la API
    
    alert('¡Reserva confirmada exitosamente!');
    this.showConfirmationModal = false;
    
    // Opcional: Resetear todo el formulario
    // this.selectedTimeSlot = null;
    // this.selectedService = null;
  }

  // Metodo para enviar el recibo por correo (usa mailto: sin backend)
  sendReceipt(): void {
    const subject = encodeURIComponent('Recibo de reserva - Tu masaje');
    const bodyLines = [
      `Fecha: ${this.selectedDate.toLocaleDateString('es-ES')}`,
      `Horario: ${this.getSelectedTimeSlotText()}`,
      `Servicio: ${this.selectedService ? this.selectedService.title : 'N/A'}`,
      `Precio: ${this.selectedService ? '$' + this.selectedService.price : 'N/A'}`,
      '',
      'Gracias por reservar con nosotros.'
    ];

    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailto = `mailto:?subject=${subject}&body=${body}`;

    // Abrir cliente de correo por defecto
    window.open(mailto, '_blank');
  }

  printBooking(): void {
    window.print();
  }

  closeConfirmationModal(): void {
    this.showConfirmationModal = false;
  }

  // Helper para obtener el texto legible del horario (ej: "10:00am - 11:00am")
  getSelectedTimeSlotText(): string {
    const allSlots = [...this.morningSlots, ...this.eveningSlots];
    const slot = allSlots.find(s => s.id === this.selectedTimeSlot);
    return slot ? slot.time : '';
  }
}