import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './confirmation-modal.html',
  styleUrls: ['./confirmation-modal.css']
})
export class ConfirmationModalComponent {
  @Input() date!: Date;
  @Input() timeSlot: string = '';
  @Input() service: Service | null = null;
  
  @Output() confirm = new EventEmitter<void>();
  @Output() print = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
  }

  onPrint(): void {
    this.print.emit();
  }

  onClose(): void {
    this.close.emit();
  }
}
