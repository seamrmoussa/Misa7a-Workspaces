import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const pLATFORM_ID = inject(PLATFORM_ID);

  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('misa7aUserToken')) {
      req = req.clone({
        setHeaders: {
          AUTHORIZATION: `Bearer ${localStorage.getItem('misa7aUserToken')}`,
        },
      });
    }
  }

  return next(req);
};
