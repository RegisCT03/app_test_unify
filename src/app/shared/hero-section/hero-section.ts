import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css']
})
export class HeroSectionComponent {
  
  scheduleAppointment(): void {
    console.log('Agendar cita');
    // Lógica para agendar cita
  }
}