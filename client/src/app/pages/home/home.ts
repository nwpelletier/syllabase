import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  backendMessage = '';
  pieces: any[] = [];
  composers: any[] = [];

  // Piece form fields
  pieceName = '';
  selectedComposerId: number | null = null;

  // Composer form fields
  newComposer = {
    firstName: '',
    lastName: '',
    birthYear: null as number | null,
    deathYear: null as number | null,
    nationality: '',
  };

  constructor(public themeService: ThemeService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchPieces();
    this.fetchComposers();
  }

  fetchPieces() {
    this.http.get<any[]>('http://localhost:3000/pieces').subscribe({
      next: (res) => (this.pieces = res),
      error: () => console.error('Failed to fetch pieces'),
    });
  }

  fetchComposers() {
    this.http.get<any[]>('http://localhost:3000/composers').subscribe({
      next: (res) => (this.composers = res),
      error: () => console.error('Failed to fetch composers'),
    });
  }

  // --- Piece Methods (existing) ---
  addPiece() {
    if (!this.pieceName || !this.selectedComposerId) return;

    const payload = {
      name: this.pieceName,
      composerId: this.selectedComposerId,
    };

    this.http.post('http://localhost:3000/pieces', payload).subscribe({
      next: () => {
        this.backendMessage = 'Piece added!';
        this.pieceName = '';
        this.selectedComposerId = null;
        this.fetchPieces();
        setTimeout(() => (this.backendMessage = ''), 3000);
      },
      error: (err) => {
        console.error(err);
        this.backendMessage = 'Error adding piece.';
        setTimeout(() => (this.backendMessage = ''), 3000);
      },
    });
  }

  get isFormValid(): boolean {
    return !!this.pieceName && !!this.selectedComposerId;
  }

  // --- NEW: Composer Methods ---
  addComposer() {
    this.http.post('http://localhost:3000/composers', this.newComposer).subscribe({
      next: () => {
        this.backendMessage = 'Composer added!';
        this.newComposer = {
          firstName: '',
          lastName: '',
          birthYear: null,
          deathYear: null,
          nationality: '',
        };
        this.fetchComposers();
        setTimeout(() => (this.backendMessage = ''), 3000);
      },
      error: (err) => {
        console.error(err);
        this.backendMessage = 'Error adding composer.';
        setTimeout(() => (this.backendMessage = ''), 3000);
      },
    });
  }
}
