import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertComponent, AlertConfig } from '../../../../shared/components/alert/alert.component';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { PermissionsDirective } from '../../../../core/directives/permissions.directive';
import { RbacService } from '../../../../core/services/rbac.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule,
    PrimaryLayoutComponent,
    PermissionsDirective,
    ButtonComponent,
    RouterModule,
    AlertComponent
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  paramId: string;
  deleteProductName: string = '';
  alertConfig: AlertConfig = {
    type: 'info',
    message: ''
  }

  show: {
    alert: boolean
  } = {
      alert: false
    }

  product: Product = {
    id: '',
    name: '',
    description: '',
    sku: '',
    stock: 0,
    isActive: false,
    price: 0.00,
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private rbacService: RbacService,
    private productService: ProductService,
    public router: Router
  ) {
    this.paramId = activatedRoute.snapshot.params['id'];
  }

  async get() {
    if (!this.rbacService.checkPermission(['read:products'])) return;
    let product = await this.productService.find(this.paramId);
    if (!product) return;
    this.product = product;
  }

  async update() {
    if (!this.rbacService.checkPermission(['update:products'])) return;

    let response = await this.productService.update(this.product);
    this.setAlert(
      response.message,
      response.type
    );
  }

  async delete() {
    if (!this.rbacService.checkPermission(['delete:products'])) return;

    if (this.deleteProductName !== this.product.name) {
      this.setAlert(
        'Please type the product name to confirm deletion',
        'info'
      );

      return;
    }

    let response = await this.productService.delete(this.product);
    this.setAlert(
      response.message,
      response.type
    );

    setTimeout(() => {
      this.router.navigate(['/products/']);
    }, 3000);
  }

  setAlert(message: string = '', type: 'success' | 'warning' | 'danger' | 'info' = 'info') {
    if (this.show.alert) return;

    this.alertConfig.message = message;
    this.alertConfig.type = type;
    this.show.alert = true;

    setTimeout(() => {
      this.show.alert = false
    }, 3000);
  }

  ngOnInit() {
    this.get();
  }
}
