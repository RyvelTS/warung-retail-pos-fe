import { CanActivateFn } from '@angular/router';

export const accessControlGuard: CanActivateFn = (route, state) => {
  return true;
};
