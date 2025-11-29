import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceEditorComponent } from '../../shared/service-editor/service-editor';
import { Router } from '@angular/router';

interface Service {
  id?: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  icon: string;
  active: boolean;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, ServiceEditorComponent],
  templateUrl: './services.html',
  styleUrls: ['./services.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  selectedService: Service | null = null;
  showEditor: boolean = false;
  editorMode: 'create' | 'edit' = 'create';

  ngOnInit(): void {
    this.loadServices();
  }
  constructor(private router: Router) {}
  backToDashboard() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/admin/dashboard']);
  }

  loadServices(): void {
    // API (Simulación de datos)
    this.services = [
      {
        id: '1',
        title: 'Masaje Deportivo',
        description: 'Ideal para atletas y personas activas. Libera la tensión muscular profunda, previene lesiones y acelera la recuperación.',
        duration: 60,
        price: 500,
        icon: 'assets/icons/sport.svg',
        active: true
      },
      {
        id: '2',
        title: 'Masaje Terapéutico',
        description: 'Enfocado en aliviar dolores específicos y mejorar lesiones. Trabajamos sobre las zonas de malestar.',
        duration: 60,
        price: 550,
        icon: 'assets/icons/therapeutic.svg',
        active: true
      },
      {
        id: '3',
        title: 'Masaje de Revisión',
        description: 'Una evaluación completa de tu estado muscular y postural. Identificamos desequilibrios y tensiones.',
        duration: 45,
        price: 400,
        icon: 'assets/icons/revision.svg',
        active: true
      },
      {
        id: '4',
        title: 'Masaje Linfático',
        description: 'Una técnica suave que estimula la circulación linfática. Perfecto para reducir hinchazón.',
        duration: 60,
        price: 600,
        icon: 'assets/icons/lymphatic.svg',
        active: false
      }
    ];
  }

  onCreateService(): void {
    this.selectedService = null;
    this.editorMode = 'create';
    this.showEditor = true;
  }

  onEditService(service: Service): void {
    this.selectedService = { ...service };
    this.editorMode = 'edit';
    this.showEditor = true;
  }

  onSaveService(service: Service): void {
    if (this.editorMode === 'create') {
      service.id = Date.now().toString();
      this.services.push(service);
      console.log('Servicio creado:', service);
    } else {
      const index = this.services.findIndex(s => s.id === service.id);
      if (index !== -1) {
        this.services[index] = service;
        console.log('Servicio actualizado:', service);
      }
    }
    this.closeEditor();
  }

  onDeleteService(id: string): void {
    this.services = this.services.filter(s => s.id !== id);
    console.log('Servicio eliminado:', id);
    this.closeEditor();
  }

  closeEditor(): void {
    this.showEditor = false;
    this.selectedService = null;
  }

  toggleServiceStatus(service: Service): void {
    service.active = !service.active;
    console.log('Estado cambiado:', service);
  }

  getActiveServicesCount(): number {
    return this.services.filter(s => s.active).length;
  }

  getInactiveServicesCount(): number {
    return this.services.filter(s => !s.active).length;
  }
}