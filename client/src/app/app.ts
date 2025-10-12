import { Component, signal, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ThemeToggle],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('syllabase-frontend');

  constructor(public themeService: ThemeService) {
    effect(() => {
      document.body.classList.toggle('isDark', this.themeService.isDark());
    });
  }
}
