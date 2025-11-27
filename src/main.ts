import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; 
import { provideBrowserGlobalErrorListeners } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners()
  ]
}).catch(err => console.error(err));