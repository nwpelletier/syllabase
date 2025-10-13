import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Composer } from '../../../../models/composer.model';
import { ComposersService } from '../../../../core/services/api/composers.service';

@Component({
  selector: 'app-add-composer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-composer-form.html',
  styleUrls: ['../../admin.css'],
})
export class AddComposerForm {
  @Input() composers: Composer[] = [];
  newComposer: Composer = {
    id: 0,
    firstName: '',
    lastName: '',
    birthYear: null,
    deathYear: null,
    nationality: '',
  };

  constructor(private composersService: ComposersService) {}

  addComposer() {
    if (!this.newComposer.firstName || !this.newComposer.lastName) return;

    const exists = this.composers.some(
      (c) =>
        c.firstName.toLowerCase() === this.newComposer.firstName.toLowerCase() &&
        c.lastName.toLowerCase() === this.newComposer.lastName.toLowerCase()
    );

    if (exists) {
      alert('Composer already exists!');
      return;
    }

    this.composersService.addComposer(this.newComposer).subscribe(() => {
      this.newComposer = this.composersService.createEmptyComposer();
    });
  }
}
