import { Component } from '@angular/core';
import { Nav } from './nav/nav';
import { ThemeService } from '../../core/services/theme.service';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Nav, ThemeToggle],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  constructor(public themeService: ThemeService) {}
}
