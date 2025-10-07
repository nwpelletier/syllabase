import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ThemeService } from '../../services/theme.service';
import { ComposersService } from '../../services/composers.service';
import { PiecesService } from '../../services/pieces.service';
import { CollectionsService } from '../../services/collections.service';
import { SyllabiService } from '../../services/syllabi.service';
import { GradesService } from '../../services/grades.service';
import { PieceSyllabiService } from '../../services/piece-syllabi.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  backendMessage = '';

  composers: any[] = [];
  pieces: any[] = [];
  collections: any[] = [];
  syllabi: any[] = [];
  grades: any[] = [];
  piecesWithDetails: any[] = [];

  pieceName = '';
  selectedComposerId: number | null = null;

  newComposer = { firstName: '', lastName: '', birthYear: null, deathYear: null, nationality: '' };
  newCollection = { name: '', composerId: null };
  selectedComposerIdForPieceSyllabus: number | null = null;
  filteredPieces: any[] = [];
  filteredCollections: any[] = [];
  filteredGrades: any[] = [];

  newPieceSyllabus = { pieceId: null, collectionId: null, syllabusId: null, gradeId: null };

  constructor(
    public themeService: ThemeService,
    private composersService: ComposersService,
    private piecesService: PiecesService,
    private collectionsService: CollectionsService,
    private syllabiService: SyllabiService,
    private gradesService: GradesService,
    private pieceSyllabiService: PieceSyllabiService
  ) {}

  ngOnInit() {
    this.loadAllData();
  }

  get isFormValid(): boolean {
    return !!this.pieceName && this.selectedComposerId != null;
  }

  loadAllData() {
    this.composersService.getAll().subscribe((res) => (this.composers = res));
    this.piecesService.getAll().subscribe((res) => {
      this.pieces = res;
      this.filterByComposer();
    });
    this.collectionsService.getAll().subscribe((res) => {
      this.collections = res;
      this.filterByComposer();
    });
    this.syllabiService.getAll().subscribe((res) => (this.syllabi = res));
    this.gradesService.getAll().subscribe((res) => (this.grades = res));
    this.pieceSyllabiService.getDetails().subscribe((res) => (this.piecesWithDetails = res));
  }

  addPiece() {
    if (!this.pieceName || !this.selectedComposerId) return;
    this.piecesService
      .add({ name: this.pieceName, composerId: this.selectedComposerId })
      .subscribe(() => {
        this.pieceName = '';
        this.selectedComposerId = null;
        this.piecesService.getAll().subscribe((res) => (this.pieces = res));
      });
  }

  addComposer() {
    this.composersService.add(this.newComposer).subscribe(() => {
      this.newComposer = {
        firstName: '',
        lastName: '',
        birthYear: null,
        deathYear: null,
        nationality: '',
      };
      this.composersService.getAll().subscribe((res) => (this.composers = res));
    });
  }

  addCollection() {
    if (!this.newCollection.name || !this.newCollection.composerId) return;
    this.collectionsService.add(this.newCollection).subscribe(() => {
      this.newCollection = { name: '', composerId: null };
      this.collectionsService.getAll().subscribe((res) => (this.collections = res));
    });
  }

  addPieceSyllabus() {
    const { pieceId, collectionId, syllabusId, gradeId } = this.newPieceSyllabus;
    if (!(pieceId || collectionId) || !(syllabusId && gradeId)) return;

    const payload: any = {};
    if (pieceId) payload.pieceId = pieceId;
    if (collectionId) payload.collectionId = collectionId;
    payload.syllabusId = syllabusId;
    payload.gradeId = gradeId;

    this.pieceSyllabiService.add(payload).subscribe(() => {
      this.newPieceSyllabus = {
        pieceId: null,
        collectionId: null,
        syllabusId: null,
        gradeId: null,
      };
      this.pieceSyllabiService.getDetails().subscribe((res) => (this.piecesWithDetails = res));
    });
  }

  onComposerChange() {
    this.filterByComposer();
  }

  filterByComposer() {
    if (!this.selectedComposerIdForPieceSyllabus) {
      this.filteredPieces = [];
      this.filteredCollections = [];
      return;
    }

    this.filteredPieces = this.pieces.filter(
      (p) => p.composer?.id === this.selectedComposerIdForPieceSyllabus
    );
    this.filteredCollections = this.collections.filter(
      (c) => c.composer?.id === this.selectedComposerIdForPieceSyllabus
    );

    this.newPieceSyllabus.pieceId = null;
    this.newPieceSyllabus.collectionId = null;
  }

  // ----- GRADES/SYLLABI: TEMPORARY STUB -----
  onSyllabusChange() {
    this.filterBySyllabus();
  }

  filterBySyllabus() {
    if (!this.newPieceSyllabus.syllabusId) {
      this.filteredGrades = [];
      return;
    }

    this.filteredGrades = this.grades.filter(
      (g) => g.syllabus?.id === this.newPieceSyllabus.syllabusId
    );

    this.newPieceSyllabus.gradeId = null;
  }

  isPieceSyllabusFormValid(): boolean {
    return (
      (this.newPieceSyllabus.pieceId != null || this.newPieceSyllabus.collectionId != null) &&
      this.newPieceSyllabus.syllabusId != null &&
      this.newPieceSyllabus.gradeId != null
    );
  }
}
