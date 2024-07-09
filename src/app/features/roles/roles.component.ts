import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../shared/layouts/primary-layout/primary-layout.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, CdkDragHandle } from '@angular/cdk/drag-drop';
import axiosInstance from '../../core/instances/axios-config';
import { RbacService } from '../../core/services/rbac.service';
import { PermissionsDirective } from '../../core/directives/permissions.directive';
import { RoleService } from './services/role.service';
import { Role } from '../../core/models/role';
import { Permission } from '../../core/models/permission';
import { AlertComponent, AlertConfig } from '../../shared/components/alert/alert.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [PrimaryLayoutComponent, CommonModule, AngularMaterialModule, CdkDropList, CdkDrag, CdkDragHandle, PermissionsDirective, AlertComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  constructor(
    private rbacService: RbacService,
    private roleService: RoleService
  ) {

  }

  search = {
    permission: ''
  }

  modulePermissions = [
    {
      resource: 'transactions',
      actions: []
    },
    {
      resource: 'reports',
      actions: []
    },
    {
      resource: 'products',
      actions: [
        'create',
        'update',
        'delete'
      ]
    },
    {
      resource: 'roles',
      actions: [
        'create',
        'update',
        'delete'
      ]
    },
    {
      resource: 'users',
      actions: [
        'create',
        'update',
        'delete'
      ]
    }
  ];

  roleCounter = 4;
  roles: Role[] = [];

  alertConfig: AlertConfig = {
    type: 'info',
    message: ''
  }

  show: {
    alert: boolean
  } = {
      alert: false
    }

  get filteredModulePermissions() {
    if (this.search.permission == '') {
      return this.modulePermissions;
    }

    return this.modulePermissions.filter((modulePermission: any) => (modulePermission.resource).toLowerCase().includes(this.search.permission.toLowerCase()));
  }

  canDeleteRole(roleId: string): boolean {
    return this.rbacService.checkPermission(['delete:roles']) || (roleId + '').includes('new');
  }

  canUpdateRole() {
    return this.rbacService.checkPermission(['update:roles'])
  }

  async addRole() {
    this.roleCounter++;
    let newId = this.roleCounter + '-new'
    await this.roles.push({
      id: newId,
      name: '',
      permissions: []
    })

    this.scroll(newId, 'role');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.roles, event.previousIndex, event.currentIndex);
  }

  async searchRole(event: any) {
    if (!event || !event.target || !event.target.value) {
      console.error("Invalid event object");
      return;
    }

    const role = this.roles.find((role: any) => role.name.toLowerCase().includes(event.target.value.toLowerCase()));

    if (!role) {
      return;
    }

    await this.scroll(role.id, 'role');
  }

  async getRoles() {
    if (!this.rbacService.checkPermission(['read:roles'])) {
      console.error('Not Authorized');
    };

    this.roles = await this.roleService.index();
  }

  async getPermissions() {
    if (!this.rbacService.checkPermission(['read:roles'])) {
      console.error('Not Authorized');
    };

    this.modulePermissions = await this.rbacService.getPermissions()
  }

  async save() {
    let update = await this.roleService.updateRole(this.roles);

    this.setAlert(
      update.message,
      update.type
    );

    await this.scroll('1', 'alert');
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async scroll(id: string, object: string) {
    let element = document.querySelector('#' + object + '-' + id);
    let attempt = 5;

    while (element == null && attempt > 0) {
      await this.delay(100);
      element = document.querySelector('#' + object + '-' + id);
      console.log(element);
      attempt--;
    }

    if (element != null) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  }

  checkRoleResource(role: any, resource: string) {
    let resourceAllowed = role.permissions.some((permission: any) => permission.resource == resource);
    return resourceAllowed;
  }

  checkRoleResourcePermission(role: any, resource: string, action: string) {
    let resourceAllowed = role.permissions.find((permission: any) => permission.resource == resource);
    if (resourceAllowed == undefined) {
      return false
    }

    let permissionAllowed = resourceAllowed.actions.some((resourceAction: any) => resourceAction == action);
    return permissionAllowed;
  }

  addOrRemoveResource(role: any, resource: string) {
    if (!this.canUpdateRole()) return;

    if (this.checkRoleResource(role, resource)) {
      role.permissions = role.permissions.filter((permission: any) => permission.resource != resource);
    } else {
      let modulePermission = this.modulePermissions.find((permission) => permission.resource == resource)
      let actions: string[] = []
      if (modulePermission) {
        actions = [modulePermission.actions[0]];
      }

      role.permissions.push({
        resource: resource,
        actions: actions
      })
    }
  }

  addOrRemoveResourcePermission(role: any, resource: string, action: string) {
    if (!this.canUpdateRole()) return;

    let resourceAllowed = role.permissions.find((permission: any) => permission.resource == resource);
    if (resourceAllowed == undefined) {
      return;
    }

    if (resourceAllowed.actions.includes(action)) {
      const index = resourceAllowed.actions.indexOf(action, 0);
      if (index > -1) {
        resourceAllowed.actions.splice(index, 1);
      }
    } else {
      resourceAllowed.actions.push(action)
    }
  }

  deleteRole(deletedRole: any) {
    this.roles = this.roles.filter((role: any) => role.id != deletedRole.id);
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
    this.getPermissions()
  }
}
