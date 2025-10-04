import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark: WritableSignal<boolean> = signal(false);
  toggle(): void {
    this.isDark.set(!this.isDark());
  }
}
