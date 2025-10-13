import { Component, Input, OnInit } from '@angular/core';
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
  styleUrls: ['../../admin.css'],
})
export class AddPieceForm implements OnInit {
  @Input() composers: Composer[] = [];

  // Single-add fields
  pieceName = '';
  selectedComposerId: number | null = null;

  // Multi-add fields
  pieceRows: PieceRow[] = [];
  existingPieces: { name: string; composerId: number }[] = [];

  constructor(private adminData: AdminDataService) {}

  ngOnInit() {
    // Map pieces to name + composerId for duplicate checking
    this.adminData.pieces$.subscribe((pieces: Piece[]) => {
      this.existingPieces = pieces.map((p) => ({
        name: p.name,
        composerId: p.composer?.id ?? -1,
      }));
    });

    // Start with one row for multi-add
    this.addRow();
  }

  // -------------------
  // Single-add
  // -------------------
  addSinglePiece() {
    if (!this.pieceName || !this.selectedComposerId) return;

    this.adminData.addPiece(this.pieceName.trim(), this.selectedComposerId);

    this.pieceName = '';
    this.selectedComposerId = null;
  }

  get isSingleFormValid(): boolean {
    return !!this.pieceName && this.selectedComposerId != null;
  }

  // -------------------
  // Multi-add
  // -------------------
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

    this.pieceRows.forEach((row) => {
      this.adminData.addPiece(row.name.trim(), row.composerId!);
    });

    // Reset rows
    this.pieceRows = [];
    this.addRow();
  }

  // Helper for safe composer display
  getComposerName(c: Composer): string {
    return c.firstName && c.lastName ? `${c.firstName} ${c.lastName}` : 'Unknown Composer';
  }

  // inside AddPieceForm class
  jsonInput = '';

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

    pieces.forEach((p) => {
      this.adminData.addPiece(p.name.trim(), p.composerId);
    });

    this.jsonInput = '';
    alert(`${pieces.length} pieces added successfully!`);
  }
}
