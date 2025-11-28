import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-technique-card',
  templateUrl: './technique-card.html',
  styleUrls: ['./technique-card.css']
})
export class TechniqueCardComponent {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
}