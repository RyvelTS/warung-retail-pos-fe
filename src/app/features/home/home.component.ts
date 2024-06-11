import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { PrimaryLayoutComponent } from '../../shared/layouts/primary-layout/primary-layout.component';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { AngularFormsModule } from '../../shared/modules/angular-forms/angular-forms.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ AngularMaterialModule, AngularFormsModule, PrimaryLayoutComponent],
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
