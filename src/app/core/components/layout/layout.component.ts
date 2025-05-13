import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <!-- Sidebar -->
      <aside class="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
        <div class="flex items-center justify-center h-16 border-b dark:border-gray-700">
          <img src="/assets/logo.png" alt="Logo" class="w-8 h-8 mr-2" />
          <h1 class="text-xl font-bold text-gray-800 dark:text-white">POS System</h1>
        </div>
        <nav class="mt-6 flex-1">
          <a routerLink="dashboard" routerLinkActive="bg-primary-100 dark:bg-primary-900"
             class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span>Dashboard</span>
          </a>
          <a routerLink="pos" routerLinkActive="bg-primary-100 dark:bg-primary-900"
             class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span>POS</span>
          </a>
          <a routerLink="inventory" routerLinkActive="bg-primary-100 dark:bg-primary-900"
             class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span>Inventory</span>
          </a>
          <a routerLink="customers" routerLinkActive="bg-primary-100 dark:bg-primary-900"
             class="flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
            <span>Customers</span>
          </a>
        </nav>
        <footer class="p-4 text-xs text-gray-400 text-center">
          &copy; 2025 Your Company. v1.0.0
        </footer>
      </aside>

      <!-- Main Content -->
      <main class="ml-28 p-8">
        <header class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
            {{ (currentUser$ | async)?.name }}
          </h2>
          <button (click)="logout()"
                  class="btn-secondary">
            Logout
          </button>
        </header>
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  currentUser$ = this.authService.currentUser$;

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
