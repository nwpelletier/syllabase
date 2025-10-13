import { Component } from '@angular/core';

@Component({
  selector: 'app-youtube-search',
  standalone: true,
  templateUrl: './youtube-search.html',
  styleUrls: ['./youtube-search.css'],
})
export class YoutubeSearch {
  composer = { firstName: 'Sergei', lastName: 'Rachmaninoff' };
  piece = { name: 'Prelude Op.23 No.10' };

  get youtubeUrl(): string {
    const query = `${this.composer.lastName} ${this.composer.firstName} ${this.piece.name}`;
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  }

  openYoutube(): void {
    window.open(this.youtubeUrl, '_blank');
  }
}
