// about.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FilterChain,
  FilterOption,
  FilterSection,
} from '../../components/filter-chain/filter-chain';
import { ComposersService } from '../../core/services/api/composers.service';
import { ErasService } from '../../core/services/api/eras.service';
import { PiecesService } from '../../core/services/api/pieces.service';
import { Composer } from '../../models/composer.model';
import { Piece } from '../../models/piece.model';
import { Era } from '../../models/era.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FilterChain],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements OnInit {
  eras: FilterOption[] = [];
  composers: FilterOption[] = [];
  pieces: FilterOption[] = [];

  sections: FilterSection[] = [
    { name: 'Era', options: this.eras },
    { name: 'Composer', options: this.composers, dependsOn: 'Era' },
    { name: 'Piece', options: this.pieces, dependsOn: 'Composer' },
  ];

  selected: Record<string, FilterOption | null> = {};

  constructor(
    private composersService: ComposersService,
    private eraService: ErasService,
    private piecesService: PiecesService
  ) {}

  ngOnInit() {
    this.eraService.getAll().subscribe((eras: Era[]) => {
      this.eras = eras.map((e) => ({ id: e.id, label: e.name }));
      this.sections.find((s) => s.name === 'Era')!.options = this.eras;
    });
  }

  onFilterChange(selection: Record<string, FilterOption | null>) {
    this.selected = selection;

    const era = selection['Era'];
    const composer = selection['Composer'];

    if (era) {
      this.composersService.getByEra(era.id).subscribe((composers: Composer[]) => {
        this.composers = composers.map((c) => ({
          id: c.id,
          label: `${c.firstName} ${c.lastName}`,
        }));
        this.sections.find((s) => s.name === 'Composer')!.options = this.composers;
      });
    } else {
      this.composers = [];
    }

    if (composer) {
      this.piecesService.filter({ composerId: composer.id }).subscribe((pieces: Piece[]) => {
        this.pieces = pieces.map((p) => ({
          id: p.id,
          label: p.name,
        }));
        this.sections.find((s) => s.name === 'Piece')!.options = this.pieces;
      });
    } else {
      this.pieces = [];
      this.sections.find((s) => s.name === 'Piece')!.options = [];
    }
  }
}
