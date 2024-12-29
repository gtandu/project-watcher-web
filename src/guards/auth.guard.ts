import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (route: ActivatedRouteSnapshot, _: RouterStateSnapshot, authData: AuthGuardData): Promise<boolean | UrlTree> => {
  const { authenticated, grantedRoles } = authData;

  const requiredRole = route.data['roles'];
  if (!requiredRole) {
    return false;
  }

  const hasRequiredRole = (role: string): boolean => Object.values(grantedRoles.resourceRoles['project-watcher-client']).some((roles) => roles.includes(role));

  if (authenticated && hasRequiredRole(requiredRole)) {
    return true;
  }

  const router = inject(Router);
  return router.parseUrl('/access-denied');
};

export const canActivateAuthRole = createAuthGuard<CanActivateFn>(isAccessAllowed);
