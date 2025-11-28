import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.html',
  styleUrls: ['./service-card.css']
})
export class ServiceCardComponent {
  @Input() service!: Service;
  @Input() selected: boolean = false;
  @Output() serviceSelected = new EventEmitter<Service>();

  onSelect(): void {
    this.serviceSelected.emit(this.service);
  }
}