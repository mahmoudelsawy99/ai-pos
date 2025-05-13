import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold mb-4">{{ 'admin.reports' | translate }}</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div *ngFor="let report of reports" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div class="font-semibold text-lg mb-1">{{ report.title }}</div>
          <div class="text-gray-500 dark:text-gray-400 mb-1">{{ report.date }}</div>
          <div class="text-indigo-600 dark:text-indigo-400 font-bold mb-2">{{ report.summary }}</div>
        </div>
      </div>
    </div>
  `
})
export class ReportsComponent implements OnInit {
  reports = [
    { title: 'Daily Sales', date: '2025-05-12', summary: 'Total: $500' },
    { title: 'Inventory Report', date: '2025-05-12', summary: 'Low Stock: 3 items' },
    { title: 'Profit/Loss', date: '2025-05-12', summary: 'Profit: $120' }
  ];
  ngOnInit() {}
}
