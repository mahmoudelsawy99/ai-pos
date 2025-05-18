import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateService, Product, Order, OrderItem, Customer } from '@app/services/state.service';

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Point of Sale</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Products</h2>
          <div class="grid grid-cols-2 gap-4">
            <div *ngFor="let product of products"
                 class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
                 (click)="addToCart(product)">
              <div class="relative h-40 bg-gray-100 dark:bg-gray-600">
                <img [src]="product.image || 'assets/images/placeholder.png'"
                     [alt]="product.name"
                     class="w-full h-full object-contain p-2">
                <div *ngIf="product.stock <= 10"
                     class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Low Stock: {{ product.stock }}
                </div>
              </div>
              <div class="p-4">
                <h3 class="font-medium text-gray-900 dark:text-white truncate">{{ product.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ product.category }}</p>
                <div class="flex justify-between items-center">
                  <span class="text-lg font-bold text-[rgb(230,0,0)]">EGP {{ product.price | number:'1.2-2' }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400">Stock: {{ product.stock }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4">Current Order</h2>
          <div *ngIf="cart.length === 0" class="text-gray-500">No items in cart</div>
          <div *ngIf="cart.length > 0" class="space-y-4">
            <div *ngFor="let item of cart" class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex items-center space-x-4">
                <div class="w-16 h-16 bg-gray-100 dark:bg-gray-600 rounded-lg overflow-hidden">
                  <img [src]="item.image || 'assets/images/placeholder.png'"
                       [alt]="item.name"
                       class="w-full h-full object-contain p-1">
                </div>
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white">{{ item.name }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">EGP {{ item.price | number:'1.2-2' }} x {{ item.quantity }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button (click)="decrement(item)"
                        class="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500">
                  -
                </button>
                <span class="w-8 text-center">{{ item.quantity }}</span>
                <button (click)="increment(item)"
                        class="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500">
                  +
                </button>
                <button (click)="remove(item)"
                        class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  ×
                </button>
              </div>
            </div>
            <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="flex justify-between font-bold text-lg mb-4">
                <span>Total:</span>
                <span class="text-[rgb(230,0,0)]">EGP {{ getTotal() | number:'1.2-2' }}</span>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer</label>
                  <select [(ngModel)]="selectedCustomerId"
                          class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm">
                    <option [ngValue]="null">Walk-in Customer</option>
                    <option *ngFor="let customer of customers" [ngValue]="customer.id">
                      {{ customer.name }} ({{ customer.email }})
                    </option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
                  <select [(ngModel)]="paymentMethod"
                          class="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm">
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                  </select>
                </div>
                <button (click)="checkout()"
                        class="w-full px-4 py-3 bg-[rgb(230,0,0)] text-white rounded-lg hover:bg-red-700 font-medium">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PosComponent implements OnInit {
  products: Product[] = [];
  customers: Customer[] = [];
  cart: CartItem[] = [];
  selectedCustomerId: number | null = null;
  paymentMethod: 'cash' | 'card' = 'cash';

  constructor(@Inject(StateService) private state: StateService) {}

  ngOnInit() {
    this.state.products$.subscribe((products: Product[]) => {
      this.products = products;
      console.log(this.products);

    });
    this.state.customers$.subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }

  addToCart(product: Product) {
    if (product.stock <= 0) {
      alert('This product is out of stock!');
      return;
    }
    const existing = this.cart.find(item => item.id === product.id);
    if (existing) {
      if (existing.quantity >= product.stock) {
        alert('Cannot add more items. Stock limit reached!');
        return;
      }
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  increment(item: CartItem) {
    if (item.quantity >= item.stock) {
      alert('Cannot add more items. Stock limit reached!');
      return;
    }
    item.quantity++;
  }

  decrement(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  remove(item: CartItem) {
    this.cart = this.cart.filter(c => c.id !== item.id);
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    if (this.cart.length === 0) return;

    const orderItems: OrderItem[] = this.cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const newOrder: Order = {
      id: Date.now(),
      items: orderItems,
      total: Number(this.getTotal()),
      status: 'completed',
      paymentMethod: this.paymentMethod,
      date: new Date().toISOString(),
      customerId: this.selectedCustomerId || undefined
    };

    this.state.addOrder(newOrder);
    alert('Checkout successful!');
    this.cart = [];
    this.selectedCustomerId = null;
    this.paymentMethod = 'cash';
  }
}
