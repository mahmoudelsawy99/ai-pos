import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../../core/pipes/translate.pipe';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../services/state.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold mb-4">{{ 'pos.products' | translate }}</h1>
      <div class="card bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Products</h2>
          <button class="btn-primary px-4 py-2 bg-[rgb(230,0,0)] text-white rounded hover:bg-red-700" (click)="openAdd()">Add Product</button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Category</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Price</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Stock</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr *ngFor="let product of products">
                <td class="px-6 py-4 text-gray-900 dark:text-white">{{ product.name }}</td>
                <td class="px-6 py-4 text-gray-900 dark:text-white">{{ product.category }}</td>
                <td class="px-6 py-4 text-gray-900 dark:text-white">EGP {{ product.price }}</td>
                <td class="px-6 py-4 text-gray-900 dark:text-white">{{ product.stock }}</td>
                <td class="px-6 py-4 space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 bg-[rgb(230,0,0)] text-white px-3 py-1 rounded" (click)="openEdit(product)" aria-label="Edit">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button class="text-red-600 hover:text-red-800 bg-[rgb(230,0,0)] text-white px-3 py-1 rounded" (click)="deleteProduct(product.id)" aria-label="Delete">
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
          <h2 class="text-xl font-semibold mb-4">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</h2>
          <form (ngSubmit)="saveProduct()">
            <div class="mb-4">
              <label class="block mb-1">Name</label>
              <input [(ngModel)]="modalProduct.name" name="name" class="w-full p-2 border rounded" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Category</label>
              <input [(ngModel)]="modalProduct.category" name="category" class="w-full p-2 border rounded" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Price</label>
              <input type="number" [(ngModel)]="modalProduct.price" name="price" class="w-full p-2 border rounded" required />
            </div>
            <div class="mb-4">
              <label class="block mb-1">Stock</label>
              <input type="number" [(ngModel)]="modalProduct.stock" name="stock" class="w-full p-2 border rounded" required />
            </div>

            <div class="flex justify-end gap-2">
              <button type="button" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" (click)="closeModal()">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-[rgb(230,0,0)] text-white rounded hover:bg-red-700">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  showModal = false;
  editingProduct: Product | null = null;
  modalProduct: Product = this.getEmptyProduct();
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  getEmptyProduct(): Product {
    return { id: 0, name: '', category: '', price: 0, stock: 0 };
  }

  openAdd() {
    this.editingProduct = null;
    this.modalProduct = this.getEmptyProduct();
    this.showModal = true;
  }

  openEdit(product: Product) {
    this.editingProduct = product;
    this.modalProduct = { ...product };
    this.showModal = true;
  }

  saveProduct() {
    if (this.editingProduct) {
      this.productService.updateProduct(this.modalProduct);
    } else {
      const newId = Math.max(...this.products.map(p => p.id), 0) + 1;
      this.productService.addProduct({ ...this.modalProduct, id: newId });
    }
    this.closeModal();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  closeModal() {
    this.showModal = false;
  }
}
