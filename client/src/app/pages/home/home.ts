import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { YoutubeSearch } from '../../components/youtube-search/youtube-search';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, YoutubeSearch],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
