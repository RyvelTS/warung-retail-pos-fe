import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { CreateComponent } from './pages/create/create.component';
import { IndexComponent } from './pages/index/index.component';
import { EditComponent } from './pages/edit/edit.component';
import { accessControlGuard } from '../../core/guards/access-control.guard';

export const usersRoutes: Routes = [
    {
        path: '',
        component: IndexComponent,
        canMatch: [authGuard, accessControlGuard],
        data: { permission: 'read:users' }
    },
    {
        path: 'create',
        component: CreateComponent,
        canMatch: [authGuard, accessControlGuard],
        data: { permission: 'create:users' }
    },
    {
        path: ':id',
        component: EditComponent,
        canMatch: [authGuard, accessControlGuard],
        data: { permission: 'read:users' }
    },
];