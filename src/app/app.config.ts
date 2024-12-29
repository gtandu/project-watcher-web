import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { HttpEvent, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideKeycloakAngular } from './keycloak.config';
import { Observable } from 'rxjs';

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req);
  return next(req);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAngular(),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor, loggingInterceptor])),
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
