import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService, LoginData } from '../../../../core/services/auth.service';
import { AngularFormsModule } from '../../../../shared/modules/angular-forms/angular-forms.module';
import { AlertComponent, AlertConfig } from '../../../../shared/components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    AngularFormsModule,
    AlertComponent,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  link = environment.api_url

  data: LoginData = {
    email: '',
    password: ''
  }

  alertConfig: AlertConfig = {
    type: 'info',
    message: ''
  }

  show: {
    password: boolean,
    alert: boolean
  } = {
      password: false,
      alert: false
    }

  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  setPasswordVisibility(event: Event) {
    event.preventDefault();
    this.show.password = !this.show.password;
    this.hide = !this.hide;
  }

  async login(event: Event) {
    event.preventDefault();
    let login = await this.authService.login(this.data);
    this.setAlert(
      login.message,
      login.type
    );

    if (login.type != 'success') return;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 700);
  }

  setAlert(message: string = '', type: 'success' | 'warning' | 'danger' | 'info' = 'info') {
    if (this.show.alert) return;

    this.alertConfig.message = message;
    this.alertConfig.type = type;
    this.show.alert = true;

    setTimeout(() => {
      this.show.alert = false
    }, 3000);
  }
}
