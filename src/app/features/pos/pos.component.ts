import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { OrderService } from '../orders/order.service';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pos.component.html'
})
export class PosComponent implements OnInit {
  products: any[] = [];
  cart: any[] = [];

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: any) {
    const existing = this.cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  increment(item: any) {
    item.quantity++;
  }

  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  remove(item: any) {
    this.cart = this.cart.filter((c: any) => c.id !== item.id);
  }

  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  }

  checkout() {
    if (this.cart.length === 0) return;
    const order = {
      items: this.cart.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total: this.getTotal(),
      date: new Date(),
      status: 'completed'
    };
    this.orderService.createOrder(order).subscribe(() => {
      alert('Checkout successful!');
      this.cart = [];
    });
  }
}
