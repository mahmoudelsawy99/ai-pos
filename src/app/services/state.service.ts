import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// --- Interfaces ---
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  barcode?: string;
  image?: string;
  lastUpdated?: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone?: string;
  loyaltyPoints?: number;
  lastUpdated?: number;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentMethod: 'cash' | 'card';
  date: string;
  customerId?: number;
  cashierId?: number;
  lastUpdated?: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  name: string;
  email: string;
  lastUpdated?: number;
}

// --- Helper Types ---
type EntityKey = 'products' | 'orders' | 'users' | 'customers';
type EntityMap = {
  products: Product[];
  orders: Order[];
  users: User[];
  customers: Customer[];
};

@Injectable({ providedIn: 'root' })
export class StateService {
  private subjects: { [K in EntityKey]: BehaviorSubject<EntityMap[K]> } = {
    products: new BehaviorSubject<Product[]>(this.loadFromStorage('products')),
    orders: new BehaviorSubject<Order[]>(this.loadFromStorage('orders')),
    users: new BehaviorSubject<User[]>(this.loadFromStorage('users')),
    customers: new BehaviorSubject<Customer[]>(this.loadFromStorage('customers')),
  };

  // --- Observables ---
  products$ = this.subjects.products.asObservable();
  orders$ = this.subjects.orders.asObservable();
  users$ = this.subjects.users.asObservable();
  customers$ = this.subjects.customers.asObservable();

  // --- Generic Methods ---
  private updateEntity<K extends EntityKey>(key: K, data: EntityMap[K]) {
    this.subjects[key].next(data);
    this.saveToStorage(key, data);
  }

  private getEntity<K extends EntityKey>(key: K): EntityMap[K] {
    return this.subjects[key].getValue();
  }

  // --- Product Methods ---
  addProduct(product: Product): void {
    const now = Date.now();
    const newProduct = { ...product, lastUpdated: now };
    const products = [...this.getEntity('products'), newProduct];
    this.updateEntity('products', products);
  }

  updateProduct(product: Product): void {
    const now = Date.now();
    const products = this.getEntity('products').map(p =>
      p.id === product.id ? { ...product, lastUpdated: now } : p
    );
    this.updateEntity('products', products);
  }

  deleteProduct(id: number): void {
    const products = this.getEntity('products').filter(p => p.id !== id);
    this.updateEntity('products', products);
  }

  // --- Customer Methods ---
  addCustomer(customer: Customer): void {
    const current = this.getEntity('customers');
    this.updateEntity('customers', [...current, customer]);
  }

  updateCustomer(customer: Customer): void {
    const current = this.getEntity('customers');
    const updatedCustomers = current.map(c =>
      c.id === customer.id ? { ...customer, lastUpdated: Date.now() } : c
    );
    this.updateEntity('customers', updatedCustomers);
  }

  deleteCustomer(id: number): void {
    const current = this.getEntity('customers');
    const updatedCustomers = current.filter(c => c.id !== id);
    this.updateEntity('customers', updatedCustomers);
  }

  // --- Order Methods ---
  addOrder(order: Order): void {
    const now = Date.now();
    const newOrder = { ...order, lastUpdated: now };
    const orders = [...this.getEntity('orders'), newOrder];
    this.updateEntity('orders', orders);
  }

  updateOrder(order: Order): void {
    const now = Date.now();
    const orders = this.getEntity('orders').map(o =>
      o.id === order.id ? { ...order, lastUpdated: now } : o
    );
    this.updateEntity('orders', orders);
  }

  deleteOrder(id: number): void {
    const orders = this.getEntity('orders').filter(o => o.id !== id);
    this.updateEntity('orders', orders);
  }

  // --- Persistence ---
  private saveToStorage<K extends EntityKey>(key: K, data: EntityMap[K]) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private loadFromStorage<K extends EntityKey>(key: K): EntityMap[K] {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as EntityMap[K];
    } else {
      const initialData = this.getInitialData(key);
      this.saveToStorage(key, initialData);
      return initialData;
    }
  }

  // --- Seed Initial Data ---
  private getInitialData<K extends EntityKey>(key: K): EntityMap[K] {
    switch (key) {
      case 'products':
        return [
          {
            "id": 1,
            "name": "Samsung Galaxy A35",
            "price": 17299.00,
            "category": "Smartphones",
            "stock": 50,
            "barcode": "8806095531234",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          },
          {
            "id": 2,
            "name": "Samsung Galaxy S23",
            "price": 30999.00,
            "category": "Smartphones",
            "stock": 30,
            "barcode": "8806094781234",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          },
          {
            "id": 3,
            "name": "iPhone 16",
            "price": 41999.00,
            "category": "Smartphones",
            "stock": 20,
            "barcode": "190199123456",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          },
          {
            "id": 4,
            "name": "OPPO Reno12F 5G",
            "price": 12999.00,
            "category": "Smartphones",
            "stock": 40,
            "barcode": "6944284678901",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          },
          {
            "id": 5,
            "name": "MacBook Air 13-inch",
            "price": 38999.00,
            "category": "Computing",
            "stock": 15,
            "barcode": "194252123456",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          },
          {
            "id": 6,
            "name": "Vodafone 160 GB ",
            "price": 200.00,
            "category": "Data Packages",
            "stock": 100,
            "barcode": "8901234567890",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          },
          {
            "id": 7,
            "name": "Apple Watch Series 9",
            "price": 19999.00,
            "category": "Wearables",
            "stock": 25,
            "barcode": "190199123457",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          },
          {
            "id": 8,
            "name": "Samsung Galaxy A34 ",
            "price": 14499.00,
            "category": "Smartphones",
            "stock": 35,
            "barcode": "8806094781235",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          },
          {
            "id": 9,
            "name": "Vodafone 4G SIM Card",
            "price": 0.00,
            "category": "SIM Cards",
            "stock": 500,
            "barcode": "8901234567891",
            "image": "https://eshop.vodafone.com.eg/ecommerce/api/asset/content/1311208718.png?contextRequest=%7B%22forceCatalogForFetch%22:false,%22forceFilterByCatalogIncludeInheritance%22:false,%22forceFilterByCatalogExcludeInheritance%22:false,%22applicationId%22:%2201H5FECVAV4YWT0NGQKXEN1T51%22,%22tenantId%22:%225DF1363059675161A85F576D%22%7D"
          }
        ] as EntityMap[K];
      case 'orders':
        return [
          { id: 1, items: [{ productId: 1, quantity: 2, price: 10 }], total: 20, status: 'pending', paymentMethod: 'cash', date: new Date().toISOString(), lastUpdated: Date.now() },
        ] as EntityMap[K];
      case 'users':
        return [
          { id: 1, username: 'user1', password: 'pass1', role: 'admin', name: 'User One', email: 'user1@example.com', lastUpdated: Date.now() },
        ] as EntityMap[K];
      case 'customers':
        return [
          { id: 1, name: 'Customer One', email: 'customer1@example.com', phone: '123-456-7890', loyaltyPoints: 0, lastUpdated: Date.now() },
        ] as EntityMap[K];
      default:
        return [] as EntityMap[K];
    }
  }

  // --- Reset All State ---
  reset() {
    (Object.keys(this.subjects) as EntityKey[]).forEach(key => {
      this.updateEntity(key, [] as any);
    });
    localStorage.clear();
  }

  // --- Export All State as JSON ---
  exportState(): string {
    const state = {
      products: this.getEntity('products'),
      orders: this.getEntity('orders'),
      users: this.getEntity('users'),
      customers: this.getEntity('customers')
    };
    return JSON.stringify(state, null, 2);
  }

  // --- Import State from JSON ---
  importState(state: string): void {
    try {
      const data = JSON.parse(state);
      if (data.products) this.updateEntity('products', data.products);
      if (data.orders) this.updateEntity('orders', data.orders);
      if (data.users) this.updateEntity('users', data.users);
      if (data.customers) this.updateEntity('customers', data.customers);
    } catch (error) {
      console.error('Error importing state:', error);
    }
  }
}
