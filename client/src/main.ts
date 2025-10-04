import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Home } from './app/pages/home/home';
import { About } from './app/pages/about/about';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  // Add more routes as needed
];

bootstrapApplication(App, {
  ...appConfig, // spread your existing config
  providers: [
    ...(appConfig.providers || []), // preserve any existing providers
    provideRouter(routes), // add router here
  ],
}).catch((err) => console.error(err));
