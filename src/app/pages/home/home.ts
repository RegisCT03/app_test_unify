import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitCardComponent } from '../../shared/benefit-card/benefit-card';
import { HeaderComponent } from '../../shared/header/header'; 
import { HeroSectionComponent } from '../../shared/hero-section/hero-section';
import { TechniqueCardComponent } from '../../shared/technique-card/technique-card';    
import { FooterComponent } from '../../shared/footer/footer'; 

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
  imports: [CommonModule, BenefitCardComponent, HeaderComponent, HeroSectionComponent, TechniqueCardComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  
  techniques: Technique[] = [
    {
      icon: 'assets/icons/sport.svg', 
      title: 'Masaje Deportivo',
      description: 'Ideal para atletas y personas activas. Libera la tensión muscular profunda, previene lesiones y acelera la recuperación.'
    },
    {
      icon: 'assets/icons/therapeutic.svg',
      title: 'Masaje Terapéutico',
      description: 'Enfocado en aliviar dolores específicos y mejorar lesiones. Trabajamos sobre las zonas de malestar para disminuir el sufrimiento.'
    },
    {
      icon: 'assets/icons/revision.svg',
      title: 'Masaje de Revisión',
      description: 'Una evaluación completa de tu estado muscular y postural. Identificamos desequilibrios y tensiones.'
    },
    {
      icon: 'assets/icons/lymphatic.svg',
      title: 'Masaje Linfático',
      description: 'Una técnica suave que estimula la circulación linfática. Perfecto para reducir hinchazón y eliminar toxinas.'
    }
  ];

  // ✅ Rutas correctas apuntando a la nueva ubicación
  benefits: Benefit[] = [
    {
      image: 'assets/promo1.jpeg',
      title: 'Tu Camino Personalizado al Alivio',
      description: 'Este video te lleva detrás de cámaras de nuestra evaluación inicial. Verás cómo realizamos un análisis postural y palpatorio.',
      reverse: false
    },
    {
      image: 'assets/promo2.jpeg',
      title: 'Rendimiento y Recuperación',
      description: 'Este video te muestra cómo nuestro masaje deportivo trabaja las capas profundas de los músculos.',
      reverse: true
    },
    {
      image: 'assets/promo5.jpeg',
      title: 'Suavidad y Bienestar Interior',
      description: 'Adéntrate en la experiencia del drenaje linfático. En este video explicamos los movimientos suaves, rítmicos y precisos.',
      reverse: false
    }
  ];
}