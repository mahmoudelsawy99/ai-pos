import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Translation {
  [key: string]: string | Translation;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();
  private translations: { [lang: string]: Translation } = {};

  constructor(private http: HttpClient) {
    // Load saved language preference
    const savedLang = localStorage.getItem('language') || 'en';
    this.loadTranslations(savedLang);
  }

  private loadTranslations(lang: string) {
    this.http.get<Translation>(`/assets/i18n/${lang}.json`).subscribe(
      translations => {
        this.translations[lang] = translations;
        this.currentLang.next(lang);
      },
      error => {
        console.error(`Error loading ${lang} translations:`, error);
        // Fallback to English if translation file fails to load
        if (lang !== 'en') {
          this.loadTranslations('en');
        }
      }
    );
  }

  setLanguage(lang: string) {
    if (!this.translations[lang]) {
      this.loadTranslations(lang);
    } else {
      this.currentLang.next(lang);
      localStorage.setItem('language', lang);
    }
  }

  getCurrentLang(): string {
    return this.currentLang.value;
  }

  translate(key: string): string {
    const keys = key.split('.');
    let translation: any = this.translations[this.currentLang.value];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        return key; // Return the key if translation not found
      }
    }

    return typeof translation === 'string' ? translation : key;
  }

  getAvailableLanguages(): string[] {
    return ['en', 'ar'];
  }
}
