import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Customer Management</h1>
      <div class="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Customers</h2>
          <button class="btn-primary px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" (click)="openAdd()">Add Customer</button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loyalty Points</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr *ngFor="let customer of customers">
                <td class="px-6 py-4">{{ customer.name }}</td>
                <td class="px-6 py-4">{{ customer.email }}</td>
                <td class="px-6 py-4">{{ customer.phone }}</td>
                <td class="px-6 py-4">{{ customer.loyaltyPoints }}</td>
                <td class="px-6 py-4 space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 bg-[rgb(230,0,0)] text-white px-3 py-1 rounded" (click)="openEdit(customer)" aria-label="Edit">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 bg-[rgb(230,0,0)] text-white px-3 py-1 rounded" (click)="deleteCustomer(customer.id)" aria-label="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Add/Edit Modal -->
      <div *ngIf="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 class="text-xl font-semibold mb-4">{{ editingCustomer ? 'Edit Customer' : 'Add Customer' }}</h2>
          <form (ngSubmit)="saveCustomer()">
            <div class="mb-4">
              <label class="block mb-1">Name</label>
              <input [(ngModel)]="modalCustomer.name" name="name" class="w-full p-2 border rounded" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Email</label>
              <input [(ngModel)]="modalCustomer.email" name="email" class="w-full p-2 border rounded" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Phone</label>
              <input [(ngModel)]="modalCustomer.phone" name="phone" class="w-full p-2 border rounded" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Loyalty Points</label>
              <input type="number" [(ngModel)]="modalCustomer.loyaltyPoints" name="loyaltyPoints" class="w-full p-2 border rounded" required />
            </div>
            <div class="flex justify-end gap-2">
              <button type="button" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" (click)="closeModal()">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', loyaltyPoints: 100 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', loyaltyPoints: 200 }
  ];
  showModal = false;
  editingCustomer: Customer | null = null;
  modalCustomer: Customer = this.getEmptyCustomer();

  ngOnInit() {}

  getEmptyCustomer(): Customer {
    return { id: 0, name: '', email: '', phone: '', loyaltyPoints: 0 };
  }

  openAdd() {
    this.editingCustomer = null;
    this.modalCustomer = this.getEmptyCustomer();
    this.showModal = true;
  }

  openEdit(customer: Customer) {
    this.editingCustomer = customer;
    this.modalCustomer = { ...customer };
    this.showModal = true;
  }

  saveCustomer() {
    if (this.editingCustomer) {
      // Edit
      const idx = this.customers.findIndex(c => c.id === this.editingCustomer!.id);
      if (idx > -1) this.customers[idx] = { ...this.modalCustomer };
    } else {
      // Add
      const newId = Math.max(...this.customers.map(c => c.id), 0) + 1;
      this.customers.push({ ...this.modalCustomer, id: newId });
    }
    this.closeModal();
  }

  deleteCustomer(id: number) {
    this.customers = this.customers.filter(c => c.id !== id);
  }

  closeModal() {
    this.showModal = false;
  }
}
