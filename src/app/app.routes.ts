import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { homeRoutes } from './features/home/home.routes';
import { rolesRoutes } from './features/roles/roles.routes';
import { usersRoutes } from './features/users/users.routes';
import { productsRoutes } from './features/products/products.routes';

export const routes: Routes = [
    ...authRoutes,
    ...homeRoutes,
    {
        path: 'roles',
        children: [
            ...rolesRoutes
        ]
    },
    {
        path: 'users',
        children: [
            ...usersRoutes
        ]
    },
    {
        path: 'products',
        children: [...productsRoutes],
    },
];
