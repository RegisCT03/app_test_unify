import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-time-slot-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-slot-selector.html',
  styleUrls: ['./time-slot-selector.css']
})
export class TimeSlotSelectorComponent {
  @Input() time: string = '';
  @Input() available: boolean = true;
  @Input() selected: boolean = false;
  @Output() slotSelected = new EventEmitter<void>();

  onSelect(): void {
    if (this.available) {
      this.slotSelected.emit();
    }
  }
}