import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="space-y-8">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">POS Overview</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="card flex flex-col items-center justify-center text-center p-6 shadow-lg border-t-4 border-[rgb(230,0,0)] bg-white dark:bg-gray-800">
          <div class="mb-2 text-[rgb(230,0,0)]">
            <i class="fas fa-cash-register fa-2x"></i>
          </div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">EGP 12,500</div>
          <div class="text-sm text-gray-500 mt-1">Total Sales</div>
        </div>
        <div class="card flex flex-col items-center justify-center text-center p-6 shadow-lg border-t-4 border-blue-600 bg-white dark:bg-gray-800">
          <div class="mb-2 text-blue-600">
            <i class="fas fa-receipt fa-2x"></i>
          </div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">320</div>
          <div class="text-sm text-gray-500 mt-1">Total Orders</div>
        </div>
        <div class="card flex flex-col items-center justify-center text-center p-6 shadow-lg border-t-4 border-green-600 bg-white dark:bg-gray-800">
          <div class="mb-2 text-green-600">
            <i class="fas fa-boxes fa-2x"></i>
          </div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">48</div>
          <div class="text-sm text-gray-500 mt-1">Products</div>
        </div>
        <div class="card flex flex-col items-center justify-center text-center p-6 shadow-lg border-t-4 border-yellow-500 bg-white dark:bg-gray-800">
          <div class="mb-2 text-yellow-500">
            <i class="fas fa-users fa-2x"></i>
          </div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">210</div>
          <div class="text-sm text-gray-500 mt-1">Customers</div>
        </div>
      </div>
      <div class="mt-10 text-center text-gray-400 text-xs">* Data shown is for demonstration purposes</div>
    </div>
  `
})
export class DashboardComponent {}
