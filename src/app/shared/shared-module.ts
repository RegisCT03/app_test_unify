import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout/auth-layout';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { HeroSectionComponent } from './hero-section/hero-section';
import { TechniqueCardComponent } from './technique-card/technique-card';
import { BenefitCardComponent } from './benefit-card/benefit-card';
import { TimeSlotSelectorComponent } from './time-slot-selector/time-slot-selector';
import { ServiceCardComponent } from './service-card/service-card';
import { BookingModalComponent } from './booking-modal/booking-modal';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal';
import { AppointmentCardComponent } from './appointment-card/appointment-card';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal';
import { ClientListComponent } from './client-list/client-list';
import { ServiceEditorComponent } from './service-editor/service-editor';
import { StatsCardComponent } from './stats-card/stats-card';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    // Re-export standalone components by importing them here
    AuthLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    TechniqueCardComponent,
    BenefitCardComponent,
    TimeSlotSelectorComponent,
    ServiceCardComponent,
    BookingModalComponent,
    ConfirmationModalComponent,
    AppointmentCardComponent,
    AppointmentModalComponent,
    ClientListComponent,
    ServiceEditorComponent,
    StatsCardComponent
  ],
  exports: [
    AuthLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    TechniqueCardComponent,
    BenefitCardComponent,
    BookingModalComponent,
    ConfirmationModalComponent
  ],
})
export class SharedModule { }