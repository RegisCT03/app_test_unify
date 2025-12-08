import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitCardComponent } from '../../shared/benefit-card/benefit-card';
import { HeaderComponent } from '../../shared/header/header'; 
import { HeroSectionComponent } from '../../shared/hero-section/hero-section';
import { TechniqueCardComponent } from '../../shared/technique-card/technique-card';    
import { FooterComponent } from '../../shared/footer/footer'; 
import { RouterLink } from '@angular/router';

interface Technique {
  icon: string;
  title: string;
  description: string;
}

interface Benefit {
  image: string;
  title: string;
  description: string;
  reverse?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BenefitCardComponent, HeaderComponent, HeroSectionComponent, TechniqueCardComponent, FooterComponent, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  
  techniques: Technique[] = [
   {
      icon: '../../../assets/icons/sports.svg',
      title: 'Masaje Deportivo',
      description: 'Libera tensión profunda, mejora flexibilidad y previene lesiones. Ideal para atletas y personas activas.',
    },
    {
      icon: '../../../assets/icons/therapeutic.svg',
      title: 'Masaje Terapéutico',
      description: 'Alivia dolores específicos y acelera la recuperación de lesiones. Técnicas personalizadas.',
    },
    {
      icon: '../../../assets/icons/revision.svg',
      title: 'Masaje de Revisión',
      description: 'Evalúa tu condición muscular para crear un plan de tratamiento personalizado.',
    },
    {
      icon: '../../../assets/icons/linfatic.svg',
      title: 'Masaje Linfático',
      description: 'Estimula el sistema inmunológico, reduce hinchazón y promueve la eliminación de toxinas.',
    }
  ];

  benefits: Benefit[] = [
    {
      image: 'assets/images/promo1.jpeg',
      title: 'Tu Camino Personalizado al Alivio',
      description: 'Se realizan evaluaciones para poder identificar las lesiones y tensionesmusculares específicas en cada paciente',
      reverse: false
    },
    {
      image: 'assets/images/promo2.jpeg',
      title: 'Rendimiento y Recuperación',
      description: 'Te ayudamos a que tu recuperación sea más rápida, y aliviamos la tensión de los músculos provocada por el ejercicio.',
      reverse: true
    },
    {
      image: 'assets/images/promo5.jpeg',
      title: 'Suavidad y Bienestar Interior',
      description: 'Si tuviste alguna operación recientemente, también te ayudamos a aliviar los dolores musculares que esta pudo haber provocado, ayudando a una recuperacoón mas placenteraa',
      reverse: false
    }
  ];
}