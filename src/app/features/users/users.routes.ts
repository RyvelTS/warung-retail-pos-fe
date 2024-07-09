import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { CreateComponent } from './pages/create/create.component';
import { IndexComponent } from './pages/index/index.component';
import { EditComponent } from './pages/edit/edit.component';
import { accessControlGuard } from '../../core/guards/access-control.guard';
import { UsersComponent } from './users.component';

export const usersRoutes: Routes = [
    {
        path: '',
        component: UsersComponent,
        canMatch: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/index/index.component').then(m => m.IndexComponent),
                canMatch: [accessControlGuard],
                data: { permission: 'read:users' }
            },
            {
                path: 'create',
                loadComponent: () => import('./pages/create/create.component').then(m => m.CreateComponent),
                canMatch: [accessControlGuard],
                data: { permission: 'create:users' }
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/edit/edit.component').then(m => m.EditComponent),
                canMatch: [accessControlGuard],
                data: { permission: 'read:users' }
            }
        ]
    }
];