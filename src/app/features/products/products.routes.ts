import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ProductsComponent } from './products.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { accessControlGuard } from '../../core/guards/access-control.guard';

export const productsRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    canMatch: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent),
        canMatch: [accessControlGuard],
        data: { permission: 'read:products' }
      },
      {
        path: 'create',
        loadComponent: () => import('./pages/create/create.component').then(m => m.CreateComponent),
        canMatch: [accessControlGuard],
        data: { permission: 'create:products' }
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/edit/edit.component').then(m => m.EditComponent),
        canMatch: [accessControlGuard],
        data: { permission: 'read:products' }
      }
    ]
  }

];
