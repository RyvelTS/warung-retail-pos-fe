import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { PrimaryLayoutComponent } from '../../shared/layouts/primary-layout/primary-layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimaryLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
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
