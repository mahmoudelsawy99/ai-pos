import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { KeyboardShortcutsService } from '../services/keyboard-shortcuts.service';
import { ModalService } from '../services/modal.service';
import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component';
import { KeyboardShortcutsComponent } from '../components/keyboard-shortcuts/keyboard-shortcuts.component';
import { BarcodeScannerComponent } from '../components/barcode-scanner/barcode-scanner.component';
import { AuditLogComponent } from '../components/audit-log/audit-log.component';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LanguageSelectorComponent,
    TranslatePipe
  ],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <!-- Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-72 bg-gray-800 shadow-xl z-20 flex flex-col">
        <div class="p-6 border-b border-gray-700">
          <h2 class="flex text-2xl font-extrabold text-white tracking-wide">
          <svg width="40" class="mx-2" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M40 20C40 23.9556 38.827 27.8224 36.6294 31.1114C34.4318 34.4004 31.3082 36.9638 27.6537 38.4776C23.9992 39.9913 19.9778 40.3874 16.0982 39.6157C12.2186 38.844 8.65492 36.9392 5.85787 34.1421C3.06082 31.3451 1.15601 27.7814 0.384304 23.9018C-0.3874 20.0222 0.00866381 16.0009 1.52242 12.3463C3.03617 8.69183 5.59962 5.56823 8.8886 3.3706C12.1776 1.17298 16.0444 0 20 0C25.3023 0.00670348 30.3855 2.116 34.1347 5.86527C37.884 9.61454 39.9933 14.6977 40 20" fill="#E60000"/>
<path d="M20.3082 31.1799C14.8722 31.1799 9.12817 26.5639 9.12817 18.9746C9.20268 16.5665 9.77937 14.2005 10.8213 12.0283C11.8632 9.856 13.3475 7.92533 15.1788 6.35994C18.5966 3.54752 22.8568 1.95886 27.2815 1.84664C27.7697 1.7982 28.2624 1.86864 28.7175 2.05196C26.8853 2.44012 25.2427 3.4474 24.066 4.90438C22.8892 6.36135 22.2501 8.17913 22.2562 10.052V10.3599C28.3068 11.7959 31.0762 15.488 31.0762 20.616C31.0039 23.4304 29.8397 26.1063 27.8299 28.0779C25.82 30.0494 23.1221 31.1618 20.3068 31.1799" fill="white"/>
</svg>
          {{ 'common.appName' | translate }}</h2>
        </div>
        <nav class="flex-1 mt-4">
          <a routerLink="/dashboard" routerLinkActive="bg-gray-900 text-white"
             class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-r-full mb-1 font-medium">
            <i class="fas fa-chart-line mr-3"></i>
            {{ 'admin.dashboard' | translate }}
          </a>
          <a routerLink="/inventory" routerLinkActive="bg-gray-900 text-white"
             class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-r-full mb-1 font-medium">
            <i class="fas fa-box mr-3"></i>
            {{ 'pos.products' | translate }}
          </a>
          <a routerLink="/customers" routerLinkActive="bg-gray-900 text-white"
             class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-r-full mb-1 font-medium">
            <i class="fas fa-user-friends mr-3"></i>
            Customers
          </a>
          <a routerLink="/pos" routerLinkActive="bg-gray-900 text-white"
             class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-r-full mb-1 font-medium">
            <i class="fas fa-cash-register mr-3"></i>
            POS
          </a>
          <a routerLink="/orders" routerLinkActive="bg-gray-900 text-white"
             class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-r-full mb-1 font-medium">
            <i class="fas fa-cash-register mr-3"></i>
            orders
          </a>
          <a routerLink="/users" routerLinkActive="bg-gray-900 text-white"
             class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-r-full mb-1 font-medium">
            <i class="fas fa-users mr-3"></i>
            {{ 'admin.users' | translate }}
          </a>
          <a routerLink="/reports" routerLinkActive="bg-gray-900 text-white"
             class="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors rounded-r-full mb-1 font-medium">
            <i class="fas fa-chart-bar mr-3"></i>
            {{ 'admin.reports' | translate }}
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 ml-72 min-h-screen flex flex-col">
        <!-- Header -->
        <header class="flex justify-end items-center px-8 py-6 bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-10">
          <div class="flex items-center gap-3">
            <button (click)="toggleTheme()" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" title="Toggle Theme">
              <i class="fas" [class.fa-sun]="!isDarkMode" [class.fa-moon]="isDarkMode"></i>
            </button>
            <app-language-selector></app-language-selector>
            <button (click)="showBarcodeScanner()" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" title="Barcode Scanner">
              <i class="fas fa-barcode"></i>
            </button>
            <button (click)="showKeyboardShortcuts()" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" title="Keyboard Shortcuts">
              <i class="fas fa-keyboard"></i>
            </button>
            <button (click)="showAuditLog()" class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors" title="Audit Log">
              <i class="fas fa-history"></i>
            </button>
          </div>
        </header>

        <!-- Router Outlet -->
        <main class="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class LayoutComponent implements OnInit {
  isDarkMode = false;

  constructor(
    public authService: AuthService,
    private themeService: ThemeService,
    private keyboardShortcutsService: KeyboardShortcutsService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.isDarkMode();
    this.setupKeyboardShortcuts();
  }

  toggleTheme() {
    this.isDarkMode = this.themeService.toggleTheme();
  }

  setupKeyboardShortcuts() {
    this.keyboardShortcutsService.registerShortcut({
      key: 'b',
      ctrlKey: true,
      description: 'Open Barcode Scanner',
      action: () => this.showBarcodeScanner()
    });
    this.keyboardShortcutsService.registerShortcut({
      key: '?',
      description: 'Show Keyboard Shortcuts',
      action: () => this.showKeyboardShortcuts()
    });
    this.keyboardShortcutsService.registerShortcut({
      key: 'h',
      ctrlKey: true,
      description: 'Show Audit Log',
      action: () => this.showAuditLog()
    });
    this.keyboardShortcutsService.registerShortcut({
      key: 'd',
      ctrlKey: true,
      description: 'Toggle Dark Mode',
      action: () => this.toggleTheme()
    });
  }

  showBarcodeScanner() {
    BarcodeScannerComponent.showScanner(this.modalService);
  }

  showKeyboardShortcuts() {
    KeyboardShortcutsComponent.showHelp(this.modalService);
  }

  showAuditLog() {
    AuditLogComponent.showLogs(this.modalService);
  }
}
