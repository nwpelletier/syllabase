// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  backendMessage = '';
  pieces: any[] = [];

  constructor(public themeService: ThemeService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ message: string }>('http://localhost:3000/ping').subscribe({
      next: (res) => (this.backendMessage = res.message),
      error: () => (this.backendMessage = 'Error connecting to backend'),
    });

    this.http.get<any[]>('http://localhost:3000/pieces').subscribe({
      next: (res) => (this.pieces = res),
      error: () => console.error('Failed to fetch pieces'),
    });
  }
}
