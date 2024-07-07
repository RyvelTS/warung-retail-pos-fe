import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { AlertConfig } from '../../../../shared/components/alert/alert.component';
import { PermissionsDirective } from '../../../../core/directives/permissions.directive';
import { Role } from '../../../../core/models/role';
import { RoleService } from '../../../roles/services/role.service';
import { UserService } from '../../services/user.service';
import { RbacService } from '../../../../core/services/rbac.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [PrimaryLayoutComponent, AngularMaterialModule, PermissionsDirective, ButtonComponent],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  roles: Role[] = [];
  userRoles: string[] = [];

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private rbacService: RbacService
  ) { }

  async getRoles() {
    this.roles = await this.roleService.index();
  }

  data = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  ngOnInit() {
    this.getRoles();
  }
}
