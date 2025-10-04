// home.component.ts
import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // needed for *ngIf, *ngFor, etc.
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  constructor(public themeService: ThemeService) {}
}
