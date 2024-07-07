import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { AlertComponent, AlertConfig } from '../../../../shared/components/alert/alert.component';
import { PermissionsDirective } from '../../../../core/directives/permissions.directive';
import { Role } from '../../../../core/models/role';
import { RoleService } from '../../../roles/services/role.service';
import { UserService } from '../../services/user.service';
import { RbacService } from '../../../../core/services/rbac.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [PrimaryLayoutComponent, AngularMaterialModule, PermissionsDirective, RouterModule, ButtonComponent, AlertComponent, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  roles: Role[] = [];

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private rbacService: RbacService,
    private router: Router
  ) { }

  async getRoles() {
    this.roles = await this.roleService.index();
  }

  data = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: []
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

  setPasswordVisibility(event: Event) {
    event.preventDefault();
    this.show.password = !this.show.password;
    this.hide = !this.hide;
  }

  canCreateUser() {
    return this.rbacService.checkPermission(['create:users'])
  }

  async save() {
    if (!this.canCreateUser) return;

    let register = await this.authService.register(this.data);
    this.setAlert(
      register.message,
      register.type
    );

    if (register.type != 'success') return;
    setTimeout(() => {
      this.router.navigate(['/users']);
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

  ngOnInit() {
    this.getRoles();
  }
}
