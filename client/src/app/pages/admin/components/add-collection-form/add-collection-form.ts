import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Collection } from '../../../../models/collection.model';
import { Composer } from '../../../../models/composer.model';
import { CollectionsService } from '../../../../core/services/api/collections.service';

@Component({
  selector: 'app-add-collection-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-collection-form.html',
  styleUrls: ['./add-collection-form.css'],
})
export class AddCollectionForm {
  @Input() collections: Collection[] = [];
  @Input() composers: Composer[] = [];
  newCollection: Collection = { id: 0, name: '', composer: null };

  constructor(private collectionsService: CollectionsService) {}

  addCollection() {
    const composerId = this.newCollection.composer?.id;
    if (!this.newCollection.name || composerId == null) {
      console.log('Validation failed');
      return;
    }

    this.collectionsService.addCollection(this.newCollection.name, composerId).subscribe(() => {
      this.newCollection = { id: 0, name: '', composer: null };
    });
  }
}
