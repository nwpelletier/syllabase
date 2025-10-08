import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ThemeService } from '../../core/services/theme.service';
import { ComposersService } from '../../core/services/api/composers.service';
import { PiecesService } from '../../core/services/api/pieces.service';
import { CollectionsService } from '../../core/services/api/collections.service';
import { SyllabiService } from '../../core/services/api/syllabi.service';
import { GradesService } from '../../core/services/api/grades.service';
import { PieceSyllabiService } from '../../core/services/api/piece-syllabi.service';

import { Composer } from '../../models/composer.model';
import { Piece } from '../../models/piece.model';
import { Collection } from '../../models/collection.model';
import { Syllabus } from '../../models/syllabus.model';
import { Grade } from '../../models/grade.model';
import { PieceWithDetails } from '../../models/piece-with-details.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  // ------------------- DATA -------------------
  backendMessage = '';
  composers: Composer[] = [];
  pieces: Piece[] = [];
  collections: Collection[] = [];
  syllabi: Syllabus[] = [];
  grades: Grade[] = [];
  piecesWithDetails: PieceWithDetails[] = [];

  // ------------------- SELECTION -------------------
  selectedComposerId: number | null = null;
  selectedComposerIdForPieceSyllabus: number | null = null;

  filteredPieces: Piece[] = [];
  filteredCollections: Collection[] = [];
  filteredGrades: Grade[] = [];

  // ------------------- NEW ENTRY PLACEHOLDERS -------------------
  pieceName = '';
  newCollection: { name: string; composerId: number | null } = { name: '', composerId: null };
  newComposer: Composer = {
    id: 0,
    firstName: '',
    lastName: '',
    birthYear: null,
    deathYear: null,
    nationality: '',
  };

  newPieceSyllabus: {
    pieceId: number | null;
    collectionId: number | null;
    syllabusId: number | null;
    gradeId: number | null;
  } = { pieceId: null, collectionId: null, syllabusId: null, gradeId: null };

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

  // ------------------- LOAD -------------------
  loadAllData() {
    forkJoin({
      composers: this.composersService.getAll(),
      pieces: this.piecesService.getAll(),
      collections: this.collectionsService.getAll(),
      syllabi: this.syllabiService.getAll(),
      grades: this.gradesService.getAll(),
      piecesWithDetails: this.pieceSyllabiService.getDetails(),
    }).subscribe(({ composers, pieces, collections, syllabi, grades, piecesWithDetails }) => {
      this.composers = composers.map((c: any) => ({
        id: c.id,
        firstName: c.first_name,
        lastName: c.last_name,
        birthYear: c.birth_year,
        deathYear: c.death_year,
        nationality: c.nationality,
      }));
      this.pieces = pieces;
      this.collections = collections;
      this.syllabi = syllabi;
      this.grades = grades;
      this.piecesWithDetails = piecesWithDetails;

      console.log('Loaded piecesWithDetails:', this.piecesWithDetails);

      this.filterByComposer();
    });
  }

  // ------------------- CRUD -------------------
  addPiece() {
    if (!this.pieceName || !this.selectedComposerId) return;

    this.piecesService.addPiece(this.pieceName, this.selectedComposerId).subscribe(() => {
      this.pieceName = '';
      this.selectedComposerId = null;
      this.refreshPieces();
    });
  }

  addComposer() {
    if (!this.newComposer.firstName || !this.newComposer.lastName) return;
    this.composersService.addComposer(this.newComposer).subscribe(() => {
      this.refreshComposers();
    });
  }

  addCollection() {
    if (!this.newCollection.name || this.newCollection.composerId == null) return;
    this.collectionsService
      .addCollection(this.newCollection.name, this.newCollection.composerId)
      .subscribe(() => {
        this.refreshCollections();
      });
  }

  addPieceSyllabus() {
    const { pieceId, collectionId, syllabusId, gradeId } = this.newPieceSyllabus;

    if (!(pieceId || collectionId) || syllabusId == null || gradeId == null) return;

    this.pieceSyllabiService
      .addPieceSyllabiByIds(pieceId, collectionId, syllabusId, gradeId)
      .subscribe(() => {
        this.refreshPieceSyllabi();
      });
  }

  get isFormValid(): boolean {
    return !!this.pieceName && this.selectedComposerId != null;
  }

  // ------------------- FILTER -------------------
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

  // ------------------- REFRESH -------------------
  private refreshPieces() {
    this.piecesService.getAll().subscribe((res) => {
      this.pieces = res;
      this.filterByComposer();
    });
  }

  private refreshComposers() {
    this.composersService.getAll().subscribe((res) => (this.composers = res));
  }

  private refreshCollections() {
    this.collectionsService.getAll().subscribe((res) => {
      this.collections = res;
      this.filterByComposer();
    });
  }

  private refreshPieceSyllabi() {
    this.pieceSyllabiService.getDetails().subscribe((res) => {
      this.piecesWithDetails = res;
    });
  }
}
