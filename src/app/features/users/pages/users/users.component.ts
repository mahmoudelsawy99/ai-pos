import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold mb-4">{{ 'admin.users' | translate }}</h1>
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">Role</th>
              <th class="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of users">
              <td class="px-4 py-2">{{ user.name }}</td>
              <td class="px-4 py-2">{{ user.role }}</td>
              <td class="px-4 py-2">
                <span [ngClass]="user.active ? 'text-green-600' : 'text-red-600'">
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class UsersComponent implements OnInit {
  users = [
    { name: 'Admin User', role: 'Admin', active: true },
    { name: 'Cashier', role: 'Cashier', active: true },
    { name: 'Manager', role: 'Manager', active: false }
  ];
  ngOnInit() {}
}
