import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { homeRoutes } from './features/home/home.routes';

export const routes: Routes = [
    ...authRoutes,
    ...homeRoutes
];
