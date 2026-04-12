import { AngularAppEngine } from '@angular/ssr';

const angularApp = new AngularAppEngine();

export default {
  async fetch(request: Request): Promise<Response> {
    try {
      const res = await angularApp.handle(request);
      return res || new Response('Page not found.', { status: 404 });
    } catch (error) {
      console.error('SSR Error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
