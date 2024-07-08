import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { PermissionsDirective } from '../../../../core/directives/permissions.directive';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User } from '../../../../core/models/user';
import { UserService } from '../../services/user.service';
import { Role } from '../../../../core/models/role';
import { RoleService } from '../../../roles/services/role.service';
import { RbacService } from '../../../../core/services/rbac.service';
import { AlertComponent, AlertConfig } from '../../../../shared/components/alert/alert.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [PrimaryLayoutComponent, CommonModule, AngularMaterialModule, PermissionsDirective, RouterModule, AlertComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  user: User | undefined;
  roles: Role[] = [];
  userRoles: string[] = [];
  paramId: string;
  loading: boolean = true;

  alertConfig: AlertConfig = {
    type: 'info',
    message: ''
  }

  show: {
    alert: boolean
  } = {
      alert: false
    }


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private rbacService: RbacService,
    private router: Router
  ) {
    this.paramId = activatedRoute.snapshot.params['id'];
  }

  canUpdateUser() {
    return this.rbacService.checkPermission(['update:users'])
  }

  async getUser() {
    this.user = await this.userService.find(this.paramId);
    this.userRoles = this.user?.roles.map((role) => { return role.id }) ?? [];
  }

  async getRoles() {
    this.roles = await this.roleService.index();
  }

  async save() {
    let newUserRoles: Role[] = [];
    for (const roleId of this.userRoles) {
      const selectedRole = this.roles.find((role) => role.id == roleId);
      if (selectedRole) {
        newUserRoles.push(selectedRole)
      }
    }

    if (this.user) {
      if (this.rbacService.checkPermission(['read:roles'])) {
        this.user.roles = newUserRoles;
      }

      let update = await this.userService.update(this.user);
      this.setAlert(
        update.message,
        update.type
      );
    }
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

  async setup() {
    this.loading = true;
    await this.getUser();
    await this.getRoles();
    this.loading = false
  }

  ngOnInit() {
    this.setup();
  }
}
