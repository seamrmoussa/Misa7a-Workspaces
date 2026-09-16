import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'booking',
    renderMode: RenderMode.Client, // لن يحاول Angular بناء الصفحة مسبقاً على السيرفر
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
