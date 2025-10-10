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
import { Composer } from '../../models/composer.model';
import { Era } from '../../models/era.model';

@Component({
  selector: 'app-about',
  standalone: true, // <--- important
  imports: [CommonModule, FilterChain],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements OnInit {
  eras: FilterOption[] = [];
  composers: FilterOption[] = [];

  sections: FilterSection[] = [
    { name: 'Era', options: this.eras },
    { name: 'Composer', options: this.composers, dependsOn: 'Era' },
  ];

  selected: Record<string, FilterOption | null> = {};

  constructor(private composersService: ComposersService, private eraService: ErasService) {}

  ngOnInit() {
    this.eraService.getAll().subscribe((eras: Era[]) => {
      this.eras = eras.map((e) => ({ id: e.id, label: e.name }));
      this.sections.find((s) => s.name === 'Era')!.options = this.eras;
    });
  }

  onFilterChange(selection: Record<string, FilterOption | null>) {
    this.selected = selection;

    const era = selection['Era'];
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
  }
}
