import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Composer } from '../../../../models/composer.model';
import { Piece } from '../../../../models/piece.model';
import { AdminDataService } from '../../services/admin-data.service';

interface PieceRow {
  name: string;
  composerId: number | null;
}

@Component({
  selector: 'app-add-piece-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-piece-form.html',
  styleUrls: ['../../admin.css', './add-piece-form.css'],
})
export class AddPieceForm implements OnChanges {
  // ------------------- INPUT -------------------
  @Input() composers: Composer[] = [];

  // ------------------- DATA -------------------
  existingPieces: { name: string; composerId: number }[] = [];

  // ------------------- SINGLE ADD -------------------
  pieceName = '';
  selectedComposerId: number | null = null;

  // ------------------- MULTI ADD -------------------
  pieceRows: PieceRow[] = [];

  // ------------------- JSON MULTI ADD -------------------
  jsonInput = '';

  constructor(private adminData: AdminDataService) {
    // Subscribe to existing pieces for duplicate checking
    this.adminData.pieces$.subscribe((pieces: Piece[]) => {
      this.existingPieces = pieces.map((p) => ({
        name: p.name,
        composerId: p.composer?.id ?? -1,
      }));
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['composers'] && changes['composers'].currentValue) {
      console.log('Composers input updated:', changes['composers'].currentValue);
    }
  }

  ngOnInit() {
    this.addRow(); // start with one row for multi-add
  }

  // ------------------- SINGLE ADD -------------------
  addSinglePiece() {
    if (!this.pieceName || !this.selectedComposerId) return;
    this.adminData.addPiece(this.pieceName.trim(), this.selectedComposerId);
    this.pieceName = '';
    this.selectedComposerId = null;
  }

  get isSingleFormValid(): boolean {
    return !!this.pieceName && this.selectedComposerId != null;
  }

  // ------------------- MULTI ADD -------------------
  addRow() {
    this.pieceRows.push({ name: '', composerId: null });
  }

  removeRow(index: number) {
    if (this.pieceRows.length > 1) this.pieceRows.splice(index, 1);
  }

  get isMultiFormValid(): boolean {
    return this.pieceRows.every(
      (row) =>
        row.name.trim() &&
        row.composerId != null &&
        !this.existingPieces.some(
          (p) =>
            p.name.toLowerCase() === row.name.trim().toLowerCase() &&
            p.composerId === row.composerId
        )
    );
  }

  submitMany() {
    if (!this.isMultiFormValid) return;
    this.pieceRows.forEach((row) => this.adminData.addPiece(row.name.trim(), row.composerId!));
    this.pieceRows = [];
    this.addRow();
  }

  // ------------------- JSON MULTI ADD -------------------
  isJsonValid(): boolean {
    try {
      const arr = JSON.parse(this.jsonInput);
      if (!Array.isArray(arr)) return false;
      return arr.every(
        (p: any) =>
          typeof p.name === 'string' &&
          typeof p.composerId === 'number' &&
          !this.existingPieces.some(
            (e) =>
              e.name.toLowerCase() === p.name.trim().toLowerCase() && e.composerId === p.composerId
          )
      );
    } catch {
      return false;
    }
  }

  submitJson() {
    if (!this.isJsonValid()) {
      alert('Invalid JSON or duplicates detected.');
      return;
    }
    const pieces: { name: string; composerId: number }[] = JSON.parse(this.jsonInput);
    pieces.forEach((p) => this.adminData.addPiece(p.name.trim(), p.composerId));
    this.jsonInput = '';
    alert(`${pieces.length} pieces added successfully!`);
  }

  // ------------------- HELPERS -------------------
  getComposerName(c: Composer): string {
    return c.firstName && c.lastName ? `${c.firstName} ${c.lastName}` : 'Unknown Composer';
  }
}
