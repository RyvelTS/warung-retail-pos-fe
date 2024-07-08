import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { PermissionsDirective } from '../../../../core/directives/permissions.directive';
import { UserService } from '../../services/user.service';
import { User } from '../../../../core/models/user';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TableComponent, TableConfig } from '../../../../shared/components/table/table.component';
import { Query } from '../../../../core/models/query';
import { Response } from '../../../../core/models/response';
import { RbacService } from '../../../../core/services/rbac.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [PrimaryLayoutComponent, CommonModule, AngularMaterialModule, PermissionsDirective, ButtonComponent, TableComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  users: User[] = [];
  tableConfig: TableConfig = {
    model: 'user',
    features: {
      create: true,
      import: false
    },
    cols: [
      {
        name: 'name',
        sortable: true,
        icon: 'person',
        css: {
          cellContainer: '',
          cellText: 'font-medium',
        }
      },
      {
        name: 'email',
        sortable: true,
      }
    ],
    grid: {
      titleProp: 'name'
    },
    serverSide: {
      getFn: this.getUsers.bind(this),
      pagination: {
        total: 0,
        perPage: 15,
        currentPage: 1,
        lastPage: 1,
      }
    },
    clickFn: this.viewUser.bind(this),
    createFn: this.createUser.bind(this)
  }

  constructor(
    public router: Router,
    private userService: UserService,
    private rbacService: RbacService
  ) { }

  async getUsers(query: Query) {
    let response = await this.userService.index(
      query
    );

    return response;
  }

  viewUser(user: User) {
    this.router.navigate(['/users/' + user.id]);
  }

  canCreateUser() {
    return this.rbacService.checkPermission(['create:users'])
  }

  createUser() {
    if (!this.canCreateUser()) return;
    this.router.navigate(['/users/create']);
  }

  ngOnInit() {
    this.tableConfig.features.create = this.canCreateUser();
    // this.tableConfig.features.import = this.canCreateUser();
  }
}
