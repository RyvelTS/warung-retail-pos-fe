import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { RolesComponent } from './roles.component';
import { accessControlGuard } from '../../core/guards/access-control.guard';

export const rolesRoutes: Routes = [
    {
        path: '',
        component: RolesComponent,
        canMatch: [authGuard, accessControlGuard],
        data: { permission: 'read:roles' }
    },
];