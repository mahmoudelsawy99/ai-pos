import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <!-- Cart Header -->
      <div class="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Shopping Cart
        </h3>
      </div>

      <!-- Cart Items -->
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div *ngFor="let item of cartItems" class="p-4">
          <div class="flex items-center">
            <!-- Product Image -->
            <div class="flex-shrink-0 w-20 h-20">
              <img [src]="item.product.imageUrl" [alt]="item.product.name" class="w-full h-full object-cover rounded-md">
            </div>

            <!-- Product Details -->
            <div class="ml-4 flex-1">
              <div class="flex justify-between">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ item.product.name }}
                  </h4>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {{ item.product.category }}
                  </p>
                </div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ item.product.price * item.quantity | currency }}
                </p>
              </div>

              <!-- Quantity Controls -->
              <div class="mt-2 flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <button
                    (click)="updateQuantity(item, item.quantity - 1)"
                    [disabled]="item.quantity <= 1"
                    class="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 disabled:opacity-50">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                    </svg>
                  </button>
                  <input
                    type="number"
                    [(ngModel)]="item.quantity"
                    (change)="updateQuantity(item, item.quantity)"
                    min="1"
                    class="w-16 text-center border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white">
                  <button
                    (click)="updateQuantity(item, item.quantity + 1)"
                    class="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                <button
                  (click)="removeItem(item)"
                  class="text-sm text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300">
                  Remove
                </button>
              </div>

              <!-- Discount -->
              <div *ngIf="item.product.discount" class="mt-2">
                <p class="text-sm text-green-600 dark:text-green-400">
                  Discount: -{{ item.product.discount }}% ({{ calculateDiscount(item) | currency }})
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="px-4 py-5 sm:px-6 border-t border-gray-200 dark:border-gray-700">
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <p class="text-gray-500 dark:text-gray-400">Subtotal</p>
            <p class="text-gray-900 dark:text-white">{{ subtotal | currency }}</p>
          </div>
          <div class="flex justify-between text-sm">
            <p class="text-gray-500 dark:text-gray-400">Discount</p>
            <p class="text-green-600 dark:text-green-400">-{{ totalDiscount | currency }}</p>
          </div>
          <div class="flex justify-between text-base font-medium">
            <p class="text-gray-900 dark:text-white">Total</p>
            <p class="text-gray-900 dark:text-white">{{ total | currency }}</p>
          </div>
        </div>

        <!-- Checkout Button -->
        <div class="mt-6">
          <button
            (click)="checkout()"
            [disabled]="cartItems.length === 0"
            class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  `
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  subtotal = 0;
  totalDiscount = 0;
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateQuantity(item.product.id, quantity);
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item.product.id);
  }

  calculateDiscount(item: CartItem): number {
    if (!item.product.discount) return 0;
    return (item.product.price * item.quantity * item.product.discount) / 100;
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) =>
      sum + (item.product.price * item.quantity), 0);

    this.totalDiscount = this.cartItems.reduce((sum, item) =>
      sum + this.calculateDiscount(item), 0);

    this.total = this.subtotal - this.totalDiscount;
  }

  checkout() {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
  }
}
