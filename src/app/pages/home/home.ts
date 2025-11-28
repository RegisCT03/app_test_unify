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
      description: 'Ideal para atletas y personas activas. Libera la tensión muscular profunda, previene lesiones y acelera la recuperación, permitiéndote mantener tu rendimiento al máximo nivel.'
    },
    {
      icon: 'assets/icons/therapeutic.svg',
      title: 'Masaje Terapéutico',
      description: 'Enfocado en aliviar dolores específicos y mejorar lesiones. Trabajamos sobre las zonas de malestar para disminuir el sufrimiento y tu cuerpo se sienta revitalizado.'
    },
    {
      icon: 'assets/icons/revision.svg',
      title: 'Masaje de Revisión',
      description: 'Una evaluación completa de tu estado muscular y postural. Identificamos desequilibrios y tensiones, diseñando un plan de tratamiento personalizado a tus necesidades.'
    },
    {
      icon: 'assets/icons/lymphatic.svg',
      title: 'Masaje Linfático',
      description: 'Una técnica suave que estimula la circulación linfática. Perfecto para reducir hinchazón, eliminar toxinas, fortalecer el sistema inmunológico.'
    }
  ];

  benefits: Benefit[] = [
    {
      image: 'assets/images/relaxing-massage.jpg',
      title: 'Tu Camino Personalizado al Alivio',
      description: 'Este video te lleva detrás de cámaras de nuestra evaluación inicial. Verás cómo realizamos un análisis postural y palpatorio para identificar puntos de tensión y diseñar el plan de tratamiento perfecto, adaptado 100% a tu cuerpo y necesidades.',
      reverse: false
    },
    {
      image: 'assets/images/sport-massage.jpg',
      title: 'Rendimiento y Recuperación',
      description: 'Este video te muestra cómo nuestro masaje deportivo trabaja las capas profundas de los músculos. Verás técnicas enfocadas en liberar la tensión, aumentar la flexibilidad y preparar tu cuerpo para un óptimo rendimiento, acelerando también la recuperación post-esfuerzo.',
      reverse: true
    },
    {
      image: 'assets/images/lymphatic-massage.jpg',
      title: 'Suavidad y Bienestar Interior',
      description: 'Adéntrate en la experiencia del drenaje linfático. En este video explicamos los movimientos suaves, rítmicos y precisos que estimulan el sistema linfático, ayudando a reducir la retención de líquidos, eliminar toxinas y promover una sensación de ligereza.',
      reverse: false
    }
  ];
}