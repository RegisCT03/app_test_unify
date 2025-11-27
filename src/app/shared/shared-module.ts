import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout/auth-layout';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { HeroSectionComponent } from './hero-section/hero-section';
import { TechniqueCardComponent } from './technique-card/technique-card';
import { BenefitCardComponent } from './benefit-card/benefit-card';

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
  ]
})
export class SharedModule { }