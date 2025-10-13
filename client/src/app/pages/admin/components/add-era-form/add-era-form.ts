import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Era } from '../../../../models/era.model';
import { ErasService } from '../../../../core/services/api/eras.service';

@Component({
  selector: 'app-add-era-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-era-form.html',
  styleUrls: ['../../admin.css'],
})
export class AddEraForm {
  @Input() eras: Era[] = [];
  eraName = '';

  constructor(private erasService: ErasService) {}

  addEra() {
    const name = this.eraName.trim();
    if (!name) return;

    // Check if era already exists (case-insensitive)
    const exists = this.eras.some((e) => e.name.toLowerCase() === name.toLowerCase());

    if (exists) {
      alert(`Era "${name}" already exists!`);
      return;
    }

    this.erasService.addEra(name).subscribe((newEra) => {
      this.eras.push(newEra);
      this.eraName = '';
    });
  }

  get isFormValid(): boolean {
    return !!this.eraName;
  }
}
