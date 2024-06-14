import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../shared/layouts/primary-layout/primary-layout.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../shared/modules/angular-material/angular-material.module';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [PrimaryLayoutComponent, CommonModule, AngularMaterialModule, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent {
  search = {
    permission: ''
  }

  modulePermissions = [
    {
      module: 'transactions',
      permissions: []
    },
    {
      module: 'reports',
      permissions: []
    },
    {
      module: 'products',
      permissions: [
        'create',
        'edit',
        'delete'
      ]
    },
    {
      module: 'roles',
      permissions: [
        'create',
        'edit',
        'delete'
      ]
    },
    {
      module: 'users',
      permissions: [
        'create',
        'edit',
        'delete'
      ]
    }
  ];

  roleCounter = 4;
  roles: any = [
    {
      id: 1,
      name: 'super admin',
      permissions: [
        {
          module: 'transactions',
          permissions: []
        },
        {
          module: 'reports',
          permissions: []
        },
        {
          module: 'products',
          permissions: [
            'create',
            'edit',
            'delete'
          ]
        },
        {
          module: 'roles',
          permissions: [
            'create',
            'edit',
            'delete'
          ]
        },
        {
          module: 'users',
          permissions: [
            'create',
            'edit',
            'delete'
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'admin',
      permissions: [
        {
          module: 'transactions',
          permissions: []
        },
        {
          module: 'reports',
          permissions: []
        },
        {
          module: 'products',
          permissions: [
            'create',
            'edit',
            'delete'
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'product manager',
      permissions: [
        {
          module: 'products',
          permissions: [
            'create',
            'edit',
            'delete'
          ]
        }
      ]
    },

    {
      id: 4,
      name: 'maintainer',
      permissions: [
        {
          module: 'transactions',
          permissions: []
        },
        {
          module: 'reports',
          permissions: []
        },
      ]
    }

  ];

  get filteredModulePermissions() {
    if (this.search.permission == '') {
      return this.modulePermissions;
    }

    return this.modulePermissions.filter((modulePermission: any) => (modulePermission.module).toLowerCase().includes(this.search.permission.toLowerCase()));
  }

  async addRole() {
    this.roleCounter++;
    await this.roles.push({
      id: this.roleCounter,
      name: '',
      permissions: []
    })

    this.scroll(this.roleCounter + '', 'role');
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

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async scroll(id: string, object: string) {
    let element = document.querySelector('#' + object + '-' + id);
    let attempt = 5;

    while (element == null && attempt > 0) {
      await this.delay(100);
      element = document.querySelector('#' + object + '-' + id);
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

  checkRoleModule(role: any, module: string) {
    let moduleAllowed = role.permissions.some((permission: any) => permission.module == module);
    return moduleAllowed;
  }

  checkRoleModulePermission(role: any, module: string, permission: string) {
    let moduleAllowed = role.permissions.find((permission: any) => permission.module == module);
    if (moduleAllowed == undefined) {
      return false
    }

    let permissionAllowed = moduleAllowed.permissions.some((modulePermission: any) => modulePermission == permission);
    return permissionAllowed;
  }

  addOrRemoveModule(role: any, module: string) {
    if (this.checkRoleModule(role, module)) {
      role.permissions = role.permissions.filter((permission: any) => permission.module != module);
    } else {
      role.permissions.push({
        module: module,
        permissions: []
      })
    }
  }

  addOrRemoveModulePermission(role: any, module: string, permission: string) {
    let moduleAllowed = role.permissions.find((permission: any) => permission.module == module);
    if (moduleAllowed == undefined) {
      return;
    }

    if (moduleAllowed.permissions.includes(permission)) {
      const index = moduleAllowed.permissions.indexOf(permission, 0);
      if (index > -1) {
        moduleAllowed.permissions.splice(index, 1);
      }
    } else {
      moduleAllowed.permissions.push(permission)
    }
  }

  deleteRole(deletedRole: any) {
    this.roles = this.roles.filter((role: any) => role.id != deletedRole.id);
  }
}
