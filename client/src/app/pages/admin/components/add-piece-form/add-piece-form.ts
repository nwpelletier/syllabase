import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PiecesService } from '../../../../core/services/api/pieces.service';
import { Composer } from '../../../../models/composer.model';

@Component({
  selector: 'app-add-piece-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-piece-form.html',
  styleUrls: ['./add-piece-form.css'],
})
export class AddPieceForm {
  @Input() composers: Composer[] = [];
  pieceName = '';
  selectedComposerId: number | null = null;

  constructor(private piecesService: PiecesService) {}

  addPiece() {
    if (!this.pieceName || !this.selectedComposerId) return;

    this.piecesService.addPiece(this.pieceName, this.selectedComposerId).subscribe(() => {
      this.pieceName = '';
      this.selectedComposerId = null;
    });
  }

  get isFormValid(): boolean {
    return !!this.pieceName && this.selectedComposerId != null;
  }
}
