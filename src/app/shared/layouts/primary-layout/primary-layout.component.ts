import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-primary-layout',
  standalone: true,
  imports: [AngularMaterialModule, SidebarComponent],
  templateUrl: './primary-layout.component.html',
  styleUrl: './primary-layout.component.scss'
})
export class PrimaryLayoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  async logout(event: Event) {
    event.preventDefault();
    await this.authService.logout();
    this.router.navigate(['login']);
  }

  get user() {
    return this.authService.user;
  }
}
