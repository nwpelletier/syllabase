import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { Home } from './app/pages/home/home';
import { About } from './app/pages/about/about';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
];

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient()],
}).catch((err) => console.error(err));
