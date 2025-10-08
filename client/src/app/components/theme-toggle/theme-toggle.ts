import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.css'],
})
export class ThemeToggle {
  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
