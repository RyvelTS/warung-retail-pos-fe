import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { AuthService, RegisterData } from '../../../../core/services/auth.service';
import { AngularFormsModule } from '../../../../shared/modules/angular-forms/angular-forms.module';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    AngularFormsModule,
    ButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  hide = true;
  data: RegisterData = {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }
  setPasswordVisibility(event: Event) {
    event.preventDefault();
    this.hide = !this.hide;
  }

  register(event: Event) {
    event.preventDefault();
    if (this.data.name == '') {
      return;
    }

    this.authService.register(this.data);
    this.router.navigate(['/login']);
  }
}
