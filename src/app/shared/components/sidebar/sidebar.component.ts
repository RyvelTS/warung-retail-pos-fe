import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PermissionsDirective } from '../../../core/directives/permissions.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule, RouterModule, PermissionsDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navLinks: {
    icon: string,
    link: string,
    name: string,
    permissions: string[],
    exact?: boolean
  }[] = [
      {
        icon: 'home',
        link: '',
        name: 'home',
        permissions: [],
        exact: true
      },
      {
        icon: 'receipt_long',
        link: 'transactions',
        name: 'transactions',
        permissions: []
      },
      {
        icon: 'summarize',
        link: 'reports',
        name: 'reports',
        permissions: []
      },
      {
        icon: 'inventory2',
        link: 'products',
        name: 'products',
        permissions: []
      },
      {
        icon: 'key',
        link: 'roles',
        name: 'roles',
        permissions: ['read:roles']
      },
      {
        icon: 'people',
        link: 'users',
        name: 'users',
        permissions: ['read:users']
      }
    ];
}
