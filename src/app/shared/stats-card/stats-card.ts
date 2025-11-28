import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.html',
  styleUrls: ['./stats-card.css']
})
export class StatsCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() icon: string = '';
  @Input() color: string = '#3b5998';
}