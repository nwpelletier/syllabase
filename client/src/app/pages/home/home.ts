// home.component.ts
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

  constructor(public themeService: ThemeService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ message: string }>('http://localhost:3000/ping').subscribe({
      next: (res) => {
        this.backendMessage = res.message;
        window.alert(`Backend says: ${this.backendMessage}`);
      },
      error: (err) => {
        this.backendMessage = 'Error connecting to backend';
        window.alert(this.backendMessage);
      },
    });
  }
}
