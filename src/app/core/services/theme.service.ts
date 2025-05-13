import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();
  private readonly THEME_KEY = 'theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';

  constructor() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkMode.next(savedTheme === 'dark');
    } else {
      this.darkMode.next(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    this.applyTheme(this.isDarkMode());
  }

  isDarkMode(): boolean {
    return localStorage.getItem(this.THEME_KEY) === this.DARK_THEME;
  }

  toggleTheme(): boolean {
    const isDark = !this.isDarkMode();
    this.applyTheme(isDark);
    return isDark;
  }

  private applyTheme(isDark: boolean) {
    const theme = isDark ? this.DARK_THEME : this.LIGHT_THEME;
    localStorage.setItem(this.THEME_KEY, theme);
    document.documentElement.classList.toggle(this.DARK_THEME, isDark);
  }
}
