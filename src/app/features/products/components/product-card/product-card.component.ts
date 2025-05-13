import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <!-- Product Image -->
      <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 dark:bg-gray-700">
        <img
          [src]="product.imageUrl"
          [alt]="product.name"
          class="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
        >
      </div>

      <!-- Product Info -->
      <div class="p-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-sm font-medium text-gray-900 dark:text-white">
              {{ product.name }}
            </h3>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ product.category }}
            </p>
          </div>
          <p class="text-sm font-medium text-gray-900 dark:text-white">
            {{ product.price | currency }}
          </p>
        </div>

        <!-- Quick Actions -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <button
              (click)="decrementQuantity()"
              class="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              [disabled]="quantity <= 1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ quantity }}</span>
            <button
              (click)="incrementQuantity()"
              class="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <button
            (click)="addToCart()"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add to Cart
          </button>
        </div>
      </div>

      <!-- Discount Badge -->
      <div *ngIf="product.discount"
           class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
        -{{ product.discount }}%
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
  quantity = 1;

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', { ...this.product, quantity: this.quantity });
  }
}
