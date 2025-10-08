import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CamelCaseInterceptor } from './app/core/interceptors/camel-case.interceptor';
import { provideRouter, Routes } from '@angular/router';
import { Home } from './app/pages/home/home';
import { About } from './app/pages/about/about';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
];

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: CamelCaseInterceptor, multi: true },
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
