import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { guestGuard } from '../../core/guards/guest.guard';

export const authRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canMatch: [guestGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canMatch: [guestGuard]
    }
];