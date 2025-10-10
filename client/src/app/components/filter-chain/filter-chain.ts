// filter-chain.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- add this

export interface FilterOption {
  id: number;
  label: string;
  [key: string]: any;
}

export interface FilterSection {
  name: string;
  options: FilterOption[];
  dependsOn?: string;
}

@Component({
  selector: 'app-filter-chain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-chain.html',
  styleUrls: ['./filter-chain.css'],
})
export class FilterChain {
  @Input() sections: FilterSection[] = [];
  @Output() selectionChange = new EventEmitter<Record<string, FilterOption | null>>();

  selected: Record<string, FilterOption | null> = {};

  onSelect(section: FilterSection, option: FilterOption) {
    this.selected[section.name] = option;
    this.clearDependentSelections(section.name);
    this.selectionChange.emit({ ...this.selected });
  }

  private clearDependentSelections(sectionName: string) {
    this.sections.forEach((s) => {
      if (s.dependsOn === sectionName) {
        this.selected[s.name] = null;
        this.clearDependentSelections(s.name);
      }
    });
  }

  isVisible(section: FilterSection): boolean {
    if (!section.dependsOn) return true;
    return !!this.selected[section.dependsOn];
  }

  isSelected(section: FilterSection, option: FilterOption): boolean {
    return this.selected[section.name]?.id === option.id;
  }
}
