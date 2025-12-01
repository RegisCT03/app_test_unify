import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotSelectorComponent } from './time-slot-selector';

describe('TimeSlotSelectorComponent', () => {
  let component: TimeSlotSelectorComponent;
  let fixture: ComponentFixture<TimeSlotSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeSlotSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
