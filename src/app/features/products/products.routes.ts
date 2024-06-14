import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ProductsComponent } from './products.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canMatch: [authGuard],
  },
  {
    path: 'create',
    component: CreateComponent,
    canMatch: [authGuard],
  },
  {
    path: 'edit',
    component: EditComponent,
    canMatch: [authGuard],
  },
];
