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

  // Form fields
  pieceName = '';
  selectedComposerId: number | null = null;

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

        // Clear message after 3 seconds
        setTimeout(() => (this.backendMessage = ''), 3000);
      },
      error: (err) => {
        console.error(err);
        this.backendMessage = 'Error adding piece.';
        setTimeout(() => (this.backendMessage = ''), 3000);
      },
    });
  }

  // Helper getter for form validation
  get isFormValid(): boolean {
    return !!this.pieceName && !!this.selectedComposerId;
  }
}
