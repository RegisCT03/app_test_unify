import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-benefit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefit-card.html',
  styleUrls: ['./benefit-card.css']
})
export class BenefitCardComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() reverse: boolean = false; 
}
