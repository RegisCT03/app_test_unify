import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout/auth-layout';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { HeroSectionComponent } from './hero-section/hero-section';
import { TechniqueCardComponent } from './technique-card/technique-card';
import { BenefitCardComponent } from './benefit-card/benefit-card';
import { TimeSlotSelector } from './time-slot-selector/time-slot-selector';
import { ServiceCard } from './service-card/service-card';
import { BookingModal } from './booking-modal/booking-modal';
import { ConfirmationModal } from './confirmation-modal/confirmation-modal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    TechniqueCardComponent,
    BenefitCardComponent
  ],
  exports: [
    AuthLayoutComponent,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    TechniqueCardComponent,
    BenefitCardComponent
  ],
  declarations: [
    TimeSlotSelector,
    ServiceCard,
    BookingModal,
    ConfirmationModal
  ]
})
export class SharedModule { }