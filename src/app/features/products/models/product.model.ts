export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  discount?: number;
  barcode?: string;
  sku: string;
  createdAt: Date;
  updatedAt: Date;
}
