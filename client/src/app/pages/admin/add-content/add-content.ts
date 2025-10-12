// /admin/add-content/add-content.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { AddComposerForm } from '../components/add-composer-form/add-composer-form';
import { AddPieceForm } from '../components/add-piece-form/add-piece-form';
import { AddCollectionForm } from '../components/add-collection-form/add-collection-form';

// Services
import { AdminDataService } from '../services/admin-data.service';

// Models
import { Composer } from '../../../models/composer.model';
import { Piece } from '../../../models/piece.model';
import { Collection } from '../../../models/collection.model';
import { Syllabus } from '../../../models/syllabus.model';
import { Grade } from '../../../models/grade.model';

@Component({
  selector: 'app-add-content',
  standalone: true,
  imports: [CommonModule, FormsModule, AddComposerForm, AddPieceForm, AddCollectionForm],
  templateUrl: './add-content.html',
  styleUrls: ['./add-content.css'],
})
export class AddContent implements OnInit {
  // ------------------- DATA -------------------
  composers: Composer[] = [];
  pieces: Piece[] = [];
  collections: Collection[] = [];
  syllabi: Syllabus[] = [];
  grades: Grade[] = [];

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

  constructor(public adminData: AdminDataService) {}

  ngOnInit() {
    // Subscribe to shared data observables
    this.adminData.composers$.subscribe((data: Composer[]) => (this.composers = data));
    this.adminData.pieces$.subscribe((data: Piece[]) => (this.pieces = data));
    this.adminData.collections$.subscribe((data: Collection[]) => (this.collections = data));
    this.adminData.syllabi$.subscribe((data: Syllabus[]) => (this.syllabi = data));
    this.adminData.grades$.subscribe((data: Grade[]) => (this.grades = data));

    // Trigger the initial data load (only needed once)
    this.adminData.loadAllData();
  }

  // ------------------- FILTER -------------------
  onComposerChange() {
    this.filterByComposer();
  }

  addPieceSyllabus() {
    const { pieceId, collectionId, syllabusId, gradeId } = this.newPieceSyllabus;

    if (!(pieceId || this.newPieceSyllabus.collectionId) || syllabusId == null || gradeId == null) {
      return;
    }

    this.adminData.addPieceSyllabus(
      pieceId,
      this.newPieceSyllabus.collectionId,
      syllabusId,
      gradeId
    );

    // Optionally reset selection
    this.newPieceSyllabus.pieceId = null;
    this.newPieceSyllabus.collectionId = null;
    this.newPieceSyllabus.syllabusId = null;
    this.newPieceSyllabus.gradeId = null;
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
