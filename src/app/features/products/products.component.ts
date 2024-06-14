import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { PrimaryLayoutComponent } from '../../shared/layouts/primary-layout/primary-layout.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AngularMaterialModule,
    PrimaryLayoutComponent,
    ButtonComponent,
    RouterModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {}
