// /admin/admin.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { AdminSidebar } from './components/admin-sidebar/admin-sidebar';
import { AddComposerForm } from './components/add-composer-form/add-composer-form';
import { AddPieceForm } from './components/add-piece-form/add-piece-form';
import { AddCollectionForm } from './components/add-collection-form/add-collection-form';

// Service
import { AdminDataService } from './services/admin-data.service';

// Models
import { Composer } from '../../models/composer.model';
import { Piece } from '../../models/piece.model';
import { Collection } from '../../models/collection.model';
import { Syllabus } from '../../models/syllabus.model';
import { Grade } from '../../models/grade.model';
import { PieceWithDetails } from '../../models/piece-with-details.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AdminSidebar,
    AddComposerForm,
    AddPieceForm,
    AddCollectionForm,
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin {
  // ------------------- DATA -------------------
  composers: Composer[] = [];
  pieces: Piece[] = [];
  collections: Collection[] = [];
  syllabi: Syllabus[] = [];
  grades: Grade[] = [];
  piecesWithDetails: PieceWithDetails[] = [];

  constructor(public adminData: AdminDataService) {
    // load all data once when admin component is created
    this.adminData.loadAllData();

    // subscribe to the observables
    this.adminData.composers$.subscribe((data) => (this.composers = data));
    this.adminData.pieces$.subscribe((data) => (this.pieces = data));
    this.adminData.collections$.subscribe((data) => (this.collections = data));
    this.adminData.syllabi$.subscribe((data) => (this.syllabi = data));
    this.adminData.grades$.subscribe((data) => (this.grades = data));
    this.adminData.piecesWithDetails$.subscribe((data) => (this.piecesWithDetails = data));
  }

  // ------------------- SELECTION -------------------
  selectedComposerIdForPieceSyllabus: number | null = null;

  filteredPieces: Piece[] = [];
  filteredCollections: Collection[] = [];
  filteredGrades: Grade[] = [];

  // ------------------- NEW ENTRY PLACEHOLDERS -------------------
  newPieceSyllabus: {
    pieceId: number | null;
    collectionId: number | null;
    syllabusId: number | null;
    gradeId: number | null;
  } = { pieceId: null, collectionId: null, syllabusId: null, gradeId: null };

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
}
