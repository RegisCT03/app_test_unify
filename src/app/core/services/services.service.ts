import { Injectable } from '@angular/core';
import { ApiService } from './api.services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Modelo usado internamente en el frontend */
export interface Service {
  id?: string;
  title: string;        // name en backend
  description: string;
  duration: number;     // expectedTime en backend
  price: number;
  icon: string;
  isActive: boolean;
}

/** Modelo según la API (backend) */
interface ServiceBackend {
  id?: string | number;
  name: string;
  price: number;
  description: string;
  expectedTime: number;
  hasImage: boolean;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private api: ApiService) {}

  /**
   * Obtener todos los servicios desde la API y mapear al modelo frontend
   */
  getServices(): Observable<Service[]> {
    return this.api.get<ServiceBackend[]>('service').pipe(
      map(list => list.map(item => this.mapFromBackend(item)))
    );
  }

  /**
   * Obtener un servicio por ID
   */
  getServiceById(id: string): Observable<Service> {
    return this.api.get<ServiceBackend>(`service/${id}`).pipe(
      map(item => this.mapFromBackend(item))
    );
  }

  /**
   * Crear un nuevo servicio (mapea a los parámetros que espera la API)
   * Parámetros backend: name, price, description, expectedTime, hasImage
   */
  createService(service: Omit<Service, 'id'>): Observable<Service> {
    const payload = {
      name: service.title,
      price: service.price,
      description: service.description,
      expectedTime: service.duration,
      hasImage: !!service.icon
    };

    return this.api.post<ServiceBackend>('service', payload).pipe(
      map(item => this.mapFromBackend(item))
    );
  }

  /**
   * Actualizar un servicio existente (mapea los campos relevantes)
   */
  updateService(id: string, service: Partial<Service>): Observable<Service> {
    const payload: Partial<ServiceBackend & { is_active: boolean }> = {};
    if (service.title !== undefined) payload.name = service.title;
    if (service.price !== undefined) payload.price = service.price;
    if (service.description !== undefined) payload.description = service.description;
    if (service.duration !== undefined) payload.expectedTime = service.duration;
    if (service.icon !== undefined) payload.hasImage = !!service.icon;
    // Mapeamos 'active' del frontend a 'is_active' que el backend podría esperar.
    if (service.isActive !== undefined) payload.is_active = service.isActive;

    return this.api.put<ServiceBackend>(`service/${id}`, payload).pipe(
      map(item => this.mapFromBackend(item))
    );
  }

  /**
   * Eliminar un servicio
   */
  deleteService(id: string): Observable<void> {
    return this.api.delete<void>(`service/${id}`);
  }

  /** Convierte el objeto del backend al modelo usado en el frontend */
  private mapFromBackend(item: ServiceBackend): Service {
    return {
      id: item.id ? String(item.id) : undefined,
      title: item.name || '',
      description: item.description || '',
      duration: item.expectedTime ?? 0,
      price: item.price ?? 0,
      icon: this.mapIconName(item.name),
      // Mapeamos 'is_active' del backend a 'isActive' en el frontend. Si no existe, por defecto es true.
      isActive: (item as any).is_active !== undefined ? (item as any).is_active : true
    };
  }

  // Construye un nombre de icono local a partir del nombre del servicio
  private mapIconName(name: string | undefined): string {
    if (!name) return 'assets/icons/default.svg';
    const slug = name.toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return `assets/icons/${slug}.svg`;
  }
}
