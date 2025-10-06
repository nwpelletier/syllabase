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

  pieceName = '';
  selectedComposerId: number | null = null;

  newComposer = {
    firstName: '',
    lastName: '',
    birthYear: null as number | null,
    deathYear: null as number | null,
    nationality: '',
  };

  collections: any[] = [];
  newCollection = { name: '', composerId: null as number | null };

  syllabi: any[] = [];
  grades: any[] = [];
  newPieceSyllabus = {
    pieceId: null as number | null,
    collectionId: null as number | null,
    syllabusId: null as number | null,
    gradeId: null as number | null,
  };

  piecesWithDetails: {
    pieceName: string;
    composer: string;
    collection?: string;
    syllabus?: string;
    grade?: string;
  }[] = [];

  constructor(public themeService: ThemeService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchPieceSyllabiDetails();
    this.fetchPieces();
    this.fetchComposers();
    this.fetchCollections();
    this.fetchSyllabi();
    this.fetchGrades();
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

  fetchCollections() {
    this.http
      .get<any[]>('http://localhost:3000/collections')
      .subscribe((res) => (this.collections = res));
  }
  fetchSyllabi() {
    this.http.get<any[]>('http://localhost:3000/syllabi').subscribe((res) => (this.syllabi = res));
  }
  fetchGrades() {
    this.http.get<any[]>('http://localhost:3000/grades').subscribe((res) => (this.grades = res));
  }

  fetchPieceSyllabiDetails() {
    this.http.get<any[]>('http://localhost:3000/piece-syllabi/details').subscribe({
      next: (res) => {
        // Sort by composer first, then piece
        this.piecesWithDetails = res.sort((a, b) => {
          const composerA = (a.composer || '').toLowerCase();
          const composerB = (b.composer || '').toLowerCase();

          if (composerA < composerB) return -1;
          if (composerA > composerB) return 1;

          const pieceA = (a.pieceName || '').toLowerCase();
          const pieceB = (b.pieceName || '').toLowerCase();

          if (pieceA < pieceB) return -1;
          if (pieceA > pieceB) return 1;

          return 0; // equal
        });
      },
      error: (err) => console.error('Failed to fetch piece syllabi details', err),
    });
  }

  addCollection() {
    if (!this.newCollection.name || !this.newCollection.composerId) return;
    this.http.post('http://localhost:3000/collections', this.newCollection).subscribe({
      next: () => {
        this.newCollection = { name: '', composerId: null };
        this.fetchCollections();
      },
      error: (err) => console.error(err),
    });
  }

  addPieceSyllabus() {
    const { pieceId, collectionId, syllabusId, gradeId } = this.newPieceSyllabus;

    // Validation
    const hasPieceOrCollection = !!pieceId || !!collectionId;
    const hasSyllabusAndGrade = !!syllabusId && !!gradeId;

    if (!hasPieceOrCollection) {
      console.warn('Must provide either a piece or a collection.');
      return;
    }

    if (!hasSyllabusAndGrade) {
      console.warn('Both syllabus and grade must be provided.');
      return;
    }

    // Prepare payload — only include fields with values
    const payload: any = {};
    if (pieceId) payload.pieceId = pieceId;
    if (collectionId) payload.collectionId = collectionId;
    payload.syllabusId = syllabusId; // required
    payload.gradeId = gradeId; // required

    this.http.post('http://localhost:3000/piece-syllabi', payload).subscribe({
      next: () => {
        // Reset form
        this.newPieceSyllabus = {
          pieceId: null,
          collectionId: null,
          syllabusId: null,
          gradeId: null,
        };
        // Refresh table
        this.fetchPieceSyllabiDetails();
      },
      error: (err) => console.error(err),
    });
  }

  isPieceSyllabusFormValid() {
    const { pieceId, collectionId, syllabusId, gradeId } = this.newPieceSyllabus;
    const hasPieceOrCollection = !!pieceId || !!collectionId;
    const hasSyllabusAndGrade = !!syllabusId && !!gradeId;
    return hasPieceOrCollection && hasSyllabusAndGrade;
  }
}
