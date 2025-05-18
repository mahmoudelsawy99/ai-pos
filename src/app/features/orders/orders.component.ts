import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from './order.service';
import { StateService, Order, Product, Customer } from '@app/services/state.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
              <td class="px-6 py-4 text-gray-900 dark:text-white">
                <span [class]="getStatusClass(order.status)">{{ order.status }}</span>
              </td>
              <td class="px-6 py-4">
                <button (click)="toggleDetails(i)"
                        class="text-blue-600 hover:underline">
                  {{ expandedIndex === i ? 'Hide' : 'Show' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Order Details Modal -->
        <div *ngIf="currentOrder" class="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <div *ngIf="currentOrder.items && currentOrder.items.length > 0">
            <div class="font-semibold mb-2 text-gray-700 dark:text-white">Items:</div>
            <table class="min-w-full mb-2">
              <thead>
                <tr>
                  <th class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Product</th>
                  <th class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Quantity</th>
                  <th class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Price</th>
                  <th class="text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of currentOrder.items">
                  <td class="text-gray-900 dark:text-white">{{ getProductName(item.productId) }}</td>
                  <td class="text-gray-900 dark:text-white">{{ item.quantity }}</td>
                  <td class="text-gray-900 dark:text-white">EGP {{ item.price }}</td>
                  <td class="text-gray-900 dark:text-white">EGP {{ item.price * item.quantity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div *ngIf="currentOrder.customerId" class="mt-4">
            <div class="font-semibold text-gray-700 dark:text-white">Customer:</div>
            <div class="text-gray-900 dark:text-white">
              {{ getCustomerName(currentOrder.customerId) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  expandedIndex: number | null = null;
  products: Product[] = [];
  customers: Customer[] = [];

  get currentOrder(): Order | null {
    if (this.expandedIndex === null) return null;
    const order = this.orders[this.expandedIndex];
    return order || null;
  }

  constructor(
    @Inject(OrderService) private orderService: OrderService,
    @Inject(StateService) private state: StateService
  ) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
    this.state.products$.subscribe((products: Product[]) => {
      this.products = products;
    });
    this.state.customers$.subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  getProductName(productId: number): string {
    const product = this.products.find(p => p.id === productId);
    return product ? product.name : 'Product #' + productId;
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? `${customer.name} (${customer.email})` : 'Customer #' + customerId;
  }

  getStatusClass(status: string): string {
    const classes = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'}`;
  }
}
