import { Injectable, Inject } from '@angular/core';
import { StateService, Product } from '@app/services/state.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(@Inject(StateService) private state: StateService) {}

  getProducts(): Observable<Product[]> {
    return this.state.products$;
  }

  addProduct(product: Product): void {
    this.state.addProduct(product);
  }

  updateProduct(product: Product): void {
    this.state.updateProduct(product);
  }

  deleteProduct(id: number): void {
    this.state.deleteProduct(id);
  }
}
