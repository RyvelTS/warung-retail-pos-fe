import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { guestGuard } from '../../core/guards/guest.guard';
import { AuthComponent } from './auth.component';

export const authRoutes: Routes = [
    {
        path: 'login',
        component: AuthComponent,
        canMatch: [guestGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
            },
        ]
    },
    {
        path: 'register',
        component: AuthComponent,
        canMatch: [guestGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
            },
        ]
    }
];