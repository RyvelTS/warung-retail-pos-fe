import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { TableComponent, TableConfig } from '../../../../shared/components/table/table.component';
import { ProductService } from '../../services/product.service';
import { Query } from '../../../../core/models/query';
import { Product } from '../../models/product';
import { RbacService } from '../../../../core/services/rbac.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    AngularMaterialModule,
    PrimaryLayoutComponent,
    ButtonComponent,
    RouterModule,
    TableComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  tableConfig: TableConfig = {
    model: 'product',
    features: {
      create: true,
      import: false
    },
    cols: [
      {
        name: 'name',
        sortable: true,
        css: {
          cellContainer: '',
          cellText: 'font-medium',
        }
      },
      {
        name: 'sku',
        sortable: true,
      },
      {
        name: 'isActive',
        sortable: true,
        type: 'boolean'
      },
      {
        name: 'stock',
        sortable: true,
      },
      {
        name: 'price',
        sortable: true,
        type: 'currency'
      },
    ],
    grid: {
      titleProp: 'name'
    },
    serverSide: {
      getFn: this.getProducts.bind(this),
      pagination: {
        total: 0,
        perPage: 15,
        currentPage: 1,
        lastPage: 1,
      }
    },
    clickFn: this.viewProduct.bind(this),
    createFn: this.createProduct.bind(this)
  }

  constructor(
    private productService: ProductService,
    private rbacService: RbacService,
    public router: Router,
  ) { }

  async getProducts(query: Query) {
    let response = await this.productService.index(
      query
    );

    return response;
  }

  viewProduct(product: Product) {
    this.router.navigate(['/products/' + product.id]);
  }

  createProduct() {
    if (!this.rbacService.checkPermission(['create:products'])) return;
    this.router.navigate(['/products/create']);
  }

  ngOnInit() {
    this.tableConfig.features.create = this.rbacService.checkPermission(['create:products']);
  }
}
