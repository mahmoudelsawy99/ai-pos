import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <select
        [(ngModel)]="currentLang"
        (ngModelChange)="changeLanguage($event)"
        class="block w-full rounded-md border-gray-300 dark:border-gray-600 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:bg-gray-700 dark:text-white sm:text-sm"
      >
        <option *ngFor="let lang of availableLanguages" [value]="lang">
          {{ getLanguageName(lang) }}
        </option>
      </select>
    </div>
  `
})
export class LanguageSelectorComponent implements OnInit {
  currentLang: string = 'en';
  availableLanguages: string[] = [];

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.currentLang = this.translationService.getCurrentLang();
    this.availableLanguages = this.translationService.getAvailableLanguages();
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
  }

  getLanguageName(lang: string): string {
    const languageNames: { [key: string]: string } = {
      en: 'English',
      es: 'Español',
      ar: 'العربية'
    };
    return languageNames[lang] || lang;
  }
}
