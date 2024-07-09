import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Response } from '../../../core/models/response';
import axiosInstance from '../../../core/instances/axios-config';
import { Query } from '../../../core/models/query';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  async index(query: Query): Promise<Response> {
    let products: Product[] = [];
    let response: Response = {
      type: 'info',
      message: '',
      status: 200,
      data: {
        total: 0,
        perPage: 15,
        currentPage: 1,
        lastPage: 1,
        path: "",
        products: []
      }
    }

    try {
      const res = await axiosInstance.get('/products', {
        params: {
          page: query.page ?? 1,
          perPage: query.perPage ?? 15,
          searchTerm: query.search?.keyword ?? '',
          searchField: query.search?.field ?? '',
          sortField: query.sort?.field ?? '',
          sortOrder: query.sort?.direction ?? 'asc',
        }
      });

      response.type = 'success';
      response.status = res.status;
      response.message = 'Successfully retrieved products data';
      products = res.data.products.map((productData: any) => {
        const product: Product = new Product(
          productData.id,
          productData.name,
          productData.description,
          productData.isActive,
          productData.price,
          productData.sku,
          productData.stock
        );

        return product;
      });

      response.data.products = products
      response.data.total = res.data.total;
      response.data.lastPage = res.data.lastPage;
      response.data.currentPage = res.data.currentPage;
      response.data.perPage = res.data.perPage;
    } catch (error: any) {
      console.error(error)
      error = error.toJSON();
      response.status = error.status;
      switch (error.status) {
        case 404:
          response.type = 'danger'
          response.message = 'Product not found'
          break;

        case 403:
          response.type = 'danger'
          response.message = 'Access denied, Please contact the administrator for further assistance'
          break;

        case 400:
          response.type = 'warning'
          response.message = 'Please ensure your input format'
          break;

        default:
          response.type = 'danger'
          response.message = 'Sorry, something went wrong. Please try again later.'
          break;
      }
    }

    return response;
  }

  async find(id: string): Promise<Product | undefined> {
    let product: Product | undefined = undefined;
    try {
      const res = await axiosInstance.get('/products/' + id);
      product = new Product(
        res.data.id,
        res.data.name,
        res.data.description,
        res.data.isActive,
        res.data.price,
        res.data.sku,
        res.data.stock
      );
    } catch (error) {
      console.error(error)
    }

    return product;
  }

  async store(data: Product): Promise<Response> {
    let response: Response = new Response(
      'info',
      '',
      200,
      undefined
    );

    try {
      let res = await axiosInstance.post(`/products`, data);
      response.data = res.data;
      response.message = 'Successfully stored new product';
      response.type = 'success';
    } catch (error: any) {
      error = error.toJSON();
      response.status = error.status;
      switch (error.status) {
        case 404:
          response.type = 'danger'
          response.message = 'No product found.'
          break;

        case 400:
          response.type = 'warning'
          response.message = 'Please ensure to fill all required fields'
          break;

        default:
          response.type = 'danger'
          response.message = 'Sorry, something went wrong. Please try again later.'
          break;
      }
    }

    return response;
  }

  async update(product: Product): Promise<Response> {
    let response: Response = {
      type: 'info',
      message: '',
      status: 200,
      data: {}
    }

    try {
      let res = await axiosInstance.patch('/products/' + product.id, product);
      response.type = 'success';
      response.status = res.status;
      response.message = 'Successfully update product data';
      let productData = new Product(
        res.data.id,
        res.data.name,
        res.data.description,
        res.data.isActive,
        res.data.price,
        res.data.sku,
        res.data.stock
      );

      response.data = productData;
    } catch (error: any) {
      console.error(error)
      error = error.toJSON();
      response.status = error.status;
      switch (error.status) {
        case 404:
          response.type = 'danger'
          response.message = 'Product not found'
          break;

        case 403:
          response.type = 'danger'
          response.message = 'Access denied, Please contact the administrator for further assistance'
          break;

        case 400:
          response.type = 'warning'
          response.message = 'Please ensure your input format'
          break;

        default:
          response.type = 'danger'
          response.message = 'Sorry, something went wrong. Please try again later.'
          break;
      }
    }

    return response;
  }
}
