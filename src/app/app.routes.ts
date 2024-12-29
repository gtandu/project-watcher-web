import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { AccessDeniedComponent } from '../access-denied/access-denied.component';
import { Roles } from '../models/roles';
import { canActivateAuthRole } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [canActivateAuthRole],
    data: { roles: [Roles.USER] }
  }
];
