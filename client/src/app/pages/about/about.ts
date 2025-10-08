import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../core/services/theme.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements OnInit {
  backendMessage = '';
  constructor(public themeService: ThemeService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<{ message: string }>('http://localhost:3000/hello').subscribe({
      next: (res) => {
        this.backendMessage = res.message;
      },
      error: (err) => {
        this.backendMessage = 'Error connecting to backend';
      },
    });
  }
}
