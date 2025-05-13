import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from './order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Orders</h1>
      <div class="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">Order List</h2>
        <div *ngIf="orders.length === 0" class="text-gray-500 dark:text-gray-400">No orders yet.</div>
        <table *ngIf="orders.length > 0" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Order ID</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Total</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Details</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr *ngFor="let order of orders; let i = index">
              <td class="px-6 py-4 text-gray-900 dark:text-white">{{ order.id }}</td>
              <td class="px-6 py-4 text-gray-900 dark:text-white">{{ order.date | date:'short' }}</td>
              <td class="px-6 py-4 text-gray-900 dark:text-white">EGP {{ order.total }}</td>
              <td class="px-6 py-4 text-gray-900 dark:text-white">{{ order.status }}</td>
              <td class="px-6 py-4">
                <button (click)="toggleDetails(i)" class="text-blue-600 hover:underline">{{ expandedIndex === i ? 'Hide' : 'Show' }}</button>
              </td>
            </tr>
            <tr *ngIf="expandedIndex === i">
              <td colspan="5" class="bg-gray-50 dark:bg-gray-900 px-6 py-4">
                <div *ngIf="order.items && order.items.length > 0">
                  <div class="font-semibold mb-2 text-gray-700 dark:text-white">Items:</div>
                  <table class="min-w-full mb-2">
                    <thead>
                      <tr>
                        <th class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Product</th>
                        <th class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Quantity</th>
                        <th class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of order.items">
                        <td class="text-gray-900 dark:text-white">{{ getProductName(item.productId) }}</td>
                        <td class="text-gray-900 dark:text-white">{{ item.quantity }}</td>
                        <td class="text-gray-900 dark:text-white">EGP {{ item.price }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div *ngIf="order.customer">
                  <div class="font-semibold text-gray-700 dark:text-white">Customer:</div>
                  <div class="text-gray-900 dark:text-white">{{ order.customer.name }} ({{ order.customer.email }})</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  expandedIndex: number | null = null;
  products: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
    // Optionally, load products for name lookup
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => this.products = data);
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  getProductName(productId: number): string {
    const product = this.products.find((p: any) => p.id === productId);
    return product ? product.name : 'Product #' + productId;
  }
}
