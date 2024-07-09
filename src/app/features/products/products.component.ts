import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { PrimaryLayoutComponent } from '../../shared/layouts/primary-layout/primary-layout.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterModule } from '@angular/router';
import { TableComponent, TableConfig } from '../../shared/components/table/table.component';
import { Query } from '../../core/models/query';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AngularMaterialModule,
    PrimaryLayoutComponent,
    ButtonComponent,
    RouterModule,
    TableComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

}
