import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { HomeModule } from '../home/home.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializer } from '../utils/app-init';
import { RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, KeycloakAngularModule, HomeModule, RouterOutlet],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: []
})
export class AppModule implements DoBootstrap {
  ngDoBootstrap(appRef: ApplicationRef): void {
    appRef.bootstrap(AppComponent);
  }
}
