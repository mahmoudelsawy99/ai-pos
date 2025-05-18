import { Injectable, Inject } from '@angular/core';
import { StateService, Order } from '@app/services/state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(@Inject(StateService) private state: StateService) {}

  getOrders(): Observable<Order[]> {
    return this.state.orders$;
  }

  addOrder(order: Order): void {
    this.state.addOrder(order);
  }

  updateOrder(order: Order): void {
    this.state.updateOrder(order);
  }

  deleteOrder(id: number): void {
    this.state.deleteOrder(id);
  }
}
