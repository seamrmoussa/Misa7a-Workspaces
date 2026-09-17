import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const staffGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const pLATFORM_ID = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(pLATFORM_ID)) {
    const roleType = authService.tokenData()?.roles ?? [];

    const hasTargetRole = roleType.some((role: string) => {
      const lowerRole = role.toLocaleLowerCase();
      return lowerRole.includes('admin') || lowerRole.includes('staff');
    });

    if (hasTargetRole) {
      return true;
    } else {
      return router.parseUrl('/user-profile');
    }
  }

  return router.parseUrl('/user-profile');
};
