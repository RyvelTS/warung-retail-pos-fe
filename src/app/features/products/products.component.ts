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
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: any = [];

  ngOnInit() {
    this.getProducts();
  }

  async getProducts() {
    try {
      let res = await axiosInstance.get('/products');
      this.products = res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
