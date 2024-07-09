import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { PermissionsDirective } from '../../../../core/directives/permissions.directive';
import { RbacService } from '../../../../core/services/rbac.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AlertComponent, AlertConfig } from '../../../../shared/components/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
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
    private rbacService: RbacService,
    private productService: ProductService,
    public router: Router
  ) { }

  async create() {
    if (!this.rbacService.checkPermission(['create:products'])) return;
    let store = await this.productService.store(this.product);
    this.setAlert(
      store.message,
      store.type
    );

    if (store.type != 'success') return;
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, 700);
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

}
