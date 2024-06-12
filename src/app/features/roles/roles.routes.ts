import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { RolesComponent } from './roles.component';

export const rolesRoutes: Routes = [
    {
        path: '',
        component: RolesComponent,
        canMatch: [authGuard]
    },
];