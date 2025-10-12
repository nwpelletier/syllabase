import { Component } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-footer',
  imports: [ThemeToggle],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  constructor(public themeService: ThemeService) {}
}
