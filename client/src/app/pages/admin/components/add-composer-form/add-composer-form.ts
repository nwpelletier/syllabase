import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Era } from '../../../../models/era.model';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-add-composer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-composer-form.html',
  styleUrls: ['../../admin.css'],
})
export class AddComposerForm implements OnInit {
  newComposer!: {
    firstName: string;
    lastName: string;
    birthYear: number | null;
    deathYear: number | null;
    nationality: string;
  };
  selectedEraId: number | null = null;

  eras: Era[] = [];

  constructor(private adminData: AdminDataService) {}

  ngOnInit() {
    this.newComposer = this.createEmptyComposer();

    // Subscribe to eras like the pieces form does
    this.adminData.eras$.subscribe((e) => (this.eras = e));
    this.adminData.loadAllData(); // ensure eras are loaded
  }

  createEmptyComposer() {
    return {
      firstName: '',
      lastName: '',
      birthYear: null,
      deathYear: null,
      nationality: '',
    };
  }

  addComposer() {
    console.log('Selected Era ID:', this.selectedEraId);
    if (!this.selectedEraId) {
      alert('Please select an Era');
      return;
    }

    this.adminData.addComposer({
      firstName: this.newComposer.firstName,
      lastName: this.newComposer.lastName,
      birthYear: this.newComposer.birthYear ?? 0,
      deathYear: this.newComposer.deathYear ?? 0,
      nationality: this.newComposer.nationality || '',
      eraId: this.selectedEraId,
    });

    this.newComposer = this.createEmptyComposer();
    this.selectedEraId = null;
  }
}
