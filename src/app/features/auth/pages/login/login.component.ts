import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {Router, RouterModule} from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService, LoginData } from '../../../../core/services/auth.service';
import { AngularFormsModule } from '../../../../shared/modules/angular-forms/angular-forms.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, RouterModule, AngularFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  link = environment.api_url

  data:LoginData = {
    email:'',
    password:''
  }

  hide = true;

  constructor(
    private authService:AuthService,
    private router:Router
  ){
  }
    setPasswordVisibility(event: Event) {
      event.preventDefault();
      this.hide = !this.hide;
    }

    async login(event: Event){
      event.preventDefault();
      await this.authService.login(this.data);
      this.router.navigate(['/']);
    }
}
