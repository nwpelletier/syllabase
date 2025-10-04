import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  styleUrls: ['./nav.css'],
  imports: [RouterModule],
})
export class Nav {
  @Input() isDark: boolean = false;
}
