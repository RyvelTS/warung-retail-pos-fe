import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { CreateComponent } from './pages/create/create.component';
import { IndexComponent } from './pages/index/index.component';
import { EditComponent } from './pages/edit/edit.component';

export const usersRoutes: Routes = [
    {
        path: '',
        component: IndexComponent,
        canMatch: [authGuard]
    },
    {
        path: 'create',
        component: CreateComponent,
        canMatch: [authGuard]
    },
    {
        path: ':id',
        component: EditComponent,
        canMatch: [authGuard]
    },
];