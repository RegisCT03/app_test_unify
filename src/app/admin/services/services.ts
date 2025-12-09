import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceEditorComponent } from '../../shared/service-editor/service-editor';
import { Router } from '@angular/router';
import { ServicesService, Service } from '../../core/services/services.service';

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
  loading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }
  backToDashboard() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/admin/dashboard']);
  }

  loadServices(): void {
    this.loading = true;
    this.error = '';
    
    // Verificar que tenemos token
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('currentUser');
    console.log('=== ServicesComponent loadServices ===');
    console.log('Token en localStorage:', !!token);
    console.log('Token:', token ? token.substring(0, 50) + '...' : 'NO DISPONIBLE');
    console.log('Usuario en localStorage:', !!user);
    if (user) {
      console.log('Usuario:', JSON.parse(user));
    }
    
    this.servicesService.getServices().subscribe({
      next: (data: Service[]) => {
        this.services = data;
        console.log('Servicios cargados exitosamente:', data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        console.error('Status:', err.status);
        console.error('Headers enviados:', err.headers);
        this.error = 'Error al cargar los servicios. Intenta nuevamente.';
        this.loading = false;
        // Fallback con datos locales si hay error
        this.loadFallbackServices();
      }
    });
  }

  loadFallbackServices(): void {
    // Datos de respaldo en caso de que el API no esté disponible
    this.services = [
      {
        id: '1',
        title: 'Masaje Deportivo',
        description: 'Ideal para atletas y personas activas. Libera la tensión muscular profunda, previene lesiones y acelera la recuperación.',
        duration: 60,
        price: 500,
        icon: 'assets/icons/sports.svg',
        isActive: true
      },
      {
        id: '2',
        title: 'Masaje Terapéutico',
        description: 'Enfocado en aliviar dolores específicos y mejorar lesiones. Trabajamos sobre las zonas de malestar.',
        duration: 60,
        price: 550,
        icon: 'assets/icons/therapeutic.svg',
        isActive: true
      },
      {
        id: '3',
        title: 'Masaje de Revisión',
        description: 'Una evaluación completa de tu estado muscular y postural. Identificamos desequilibrios y tensiones.',
        duration: 45,
        price: 400,
        icon: 'assets/icons/revision.svg',
        isActive: true
      },
      {
        id: '4',
        title: 'Masaje Linfático',
        description: 'Una técnica suave que estimula la circulación linfática. Perfecto para reducir hinchazón.',
        duration: 60,
        price: 600,
        icon: 'assets/icons/linfatic.svg',
        isActive: false
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
      // Crear nuevo servicio
      const newService = { ...service };
      delete newService.id; // El API asignará el ID
      
      this.servicesService.createService(newService as Omit<Service, 'id'>).subscribe({
        next: (createdService: Service) => {
          this.services.push(createdService);
          console.log('Servicio creado exitosamente:', createdService);
          this.closeEditor();
        },
        error: (err) => {
          console.error('Error al crear servicio:', err);
          this.error = 'Error al crear el servicio. Intenta nuevamente.';
        }
      });
    } else {
      // Actualizar servicio existente
      if (service.id) {
        // Creamos un objeto parcial solo con los campos que pueden ser actualizados
        // para no enviar el objeto 'service' completo.
        const updatePayload: Partial<Service> = service;

        this.servicesService.updateService(service.id, updatePayload).subscribe({
          next: (updatedService: Service) => {
            const index = this.services.findIndex(s => s.id === updatedService.id);
            if (index !== -1) {
              this.services[index] = updatedService;
            }
            console.log('Servicio actualizado exitosamente:', updatedService);
            this.closeEditor();
          },
          error: (err) => {
            console.error('Error al actualizar servicio:', err);
            this.error = 'Error al actualizar el servicio. Intenta nuevamente.';
          }
        });
      }
    }
  }

  onDeleteService(eventData: string | Service): void {
    const id = typeof eventData === 'string' ? eventData : eventData.id;
    if (!id) return;

    this.servicesService.deleteService(id).subscribe({
      next: () => {
        this.services = this.services.filter(s => s.id !== id);
        console.log('Servicio eliminado exitosamente:', id);
        this.closeEditor();
      },
      error: (err) => {
        console.error('Error al eliminar servicio:', err);
        this.error = 'Error al eliminar el servicio. Intenta nuevamente.';
      }
    });
  }

  closeEditor(): void {
    this.showEditor = false;
    this.selectedService = null;
  }

  toggleServiceStatus(service: Service): void {
    if (!service.id) return;

    const originalStatus = service.isActive;
    service.isActive = !originalStatus; // Actualización optimista en la UI

    this.servicesService.updateService(service.id, { isActive: service.isActive }).subscribe({
      next: (updatedService) => {
        console.log('Estado del servicio actualizado exitosamente:', updatedService);
        // El servicio ya está actualizado en el array local
      },
      error: (err) => {
        console.error('Error al actualizar el estado del servicio:', err);
        this.error = 'Error al cambiar el estado. Intenta nuevamente.';
        service.isActive = originalStatus; // Revertir el cambio en la UI si hay error
      }
    });
  }

  getActiveServicesCount(): number {
    return this.services.filter(s => s.isActive).length;
  }

  getInactiveServicesCount(): number {
    return this.services.filter(s => !s.isActive).length;
  }
}