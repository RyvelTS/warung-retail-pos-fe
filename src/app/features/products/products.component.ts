import { Component, OnInit } from '@angular/core';
import { PrimaryLayoutComponent } from '../../shared/layouts/primary-layout/primary-layout.component';
import axiosInstance from '../../core/instances/axios-config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [PrimaryLayoutComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  isModalOpen: boolean = false;
  newProduct: any = {
    name: '',
    description: '',
    price: null,
    productQuantity: null,
    sku: '',
  };
  products: any = [];
  hasProducts: boolean = false;

  ngOnInit() {
    this.getProducts();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.newProduct = {
      name: '',
      description: '',
      price: null,
      productQuantity: null,
      sku: '',
    };
  }

  async getProducts() {
    try {
      const res = await axiosInstance.get('/products');
      this.products = res.data;
      this.hasProducts = this.products.length > 0;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async createProduct() {
    try {
      const { name, description, price, productQuantity, sku } =
        this.newProduct;
      if (!name || !price || !productQuantity || !sku) {
        throw new Error('Please fill in all required fields');
      }

      const payload = {
        name,
        description: description || '',
        price,
        productQuantity,
        sku,
      };

      await axiosInstance.post('/products', payload);
      this.closeModal();
      this.getProducts();
    } catch (error: unknown) {
      console.error('Error creating products:', error);
    }
  }

  async deleteProduct(productId: string) {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      this.getProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
}
