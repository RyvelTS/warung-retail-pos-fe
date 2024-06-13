import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ProductsComponent } from './products.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canMatch: [authGuard],
  },
];
