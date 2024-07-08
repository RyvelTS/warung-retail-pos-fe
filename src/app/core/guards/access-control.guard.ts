import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RbacService } from '../services/rbac.service';
import { of } from 'rxjs';

export const accessControlGuard: CanActivateFn = (route, state) => {
  const rbacService = inject(RbacService);
  const router = inject(Router);
  const requiredPermission = route.data?.['permission'] as string;
  const hasPermission = rbacService.checkPermission([requiredPermission]);
  if (!hasPermission) {
    router.navigate(['/']); // Redirect
  }

  return of(hasPermission);
};
