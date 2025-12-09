import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

// Interfaz actualizada para incluir 'price' y ser consistente con el padre
export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  price: number; 
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './confirmation-modal.html', 
  styleUrls: ['./confirmation-modal.css']   
})
export class ConfirmationModalComponent {
  @Input() date: Date = new Date(); 
  @Input() timeSlot: string = '';
  @Input() service: Service | null = null;
  
  @Output() confirm = new EventEmitter<void>();
  @Output() print = new EventEmitter<void>();
  @Output() sendReceipt = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onPrint(): void {
    this.print.emit();
  }

  onSendReceipt(): void {
    this.sendReceipt.emit();
  }

  onClose(): void {
    this.close.emit();
  }

 
  onOverlayClick(): void {
    this.close.emit();
  }

  onContentClick(event: Event): void {
    event.stopPropagation();
  }
}