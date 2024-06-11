import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AngularMaterialModule, CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  navLinks: {
    icon:string,
    link:string,
    name:string
  }[]=[
    {
      icon:'home',
      link:'',
      name:'home'
    },
    {
      icon:'receipt_long',
      link:'transactions',
      name:'transactions'
    },
    {
      icon:'summarize',
      link:'reports',
      name:'reports'
    },
    {
      icon:'inventory2',
      link:'products',
      name:'products'
    },
    {
      icon:'key',
      link:'roles',
      name:'roles'
    },
    {
      icon:'people',
      link:'users',
      name:'users'
    }
  ];

  constructor(
    private authService:AuthService,
    private router:Router
  ){
  }

  async logout(event: Event){
    event.preventDefault();
    await this.authService.logout();
    this.router.navigate(['login']);
  }
}
