import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CamelCaseInterceptor } from './app/core/interceptors/camel-case.interceptor';
import { provideRouter, Routes } from '@angular/router';

// Pages
import { Home } from './app/pages/home/home';
import { About } from './app/pages/about/about';
import { Admin } from './app/pages/admin/admin';
import { Composers } from './app/pages/admin/composers/composers';
import { AddContent } from './app/pages/admin/add-content/add-content';
import { Pieces } from './app/pages/admin/pieces/pieces';
import { Syllabi } from './app/pages/admin/syllabi/syllabi';
import { ViewContent } from './app/pages/admin/view-content/view-content';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: 'composers', component: Composers },
      { path: 'add-content', component: AddContent },
      { path: 'pieces', component: Pieces },
      { path: 'syllabi', component: Syllabi },
      { path: 'view-content', component: ViewContent },
      { path: '', redirectTo: 'view-content', pathMatch: 'full' },
    ],
  },
];

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: CamelCaseInterceptor, multi: true },
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
