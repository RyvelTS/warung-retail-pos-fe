import { Component } from '@angular/core';
import { PrimaryLayoutComponent } from '../../../../shared/layouts/primary-layout/primary-layout.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../../../../shared/modules/angular-material/angular-material.module';
import { PermissionsDirective } from '../../../../core/directives/permissions.directive';
import { UserService } from '../../services/user.service';
import { User } from '../../../../core/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [PrimaryLayoutComponent, CommonModule, AngularMaterialModule, PermissionsDirective],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  users: User[] = [];
  constructor(
    private userService: UserService,
    public router: Router
  ) { }

  async getUsers() {
    this.users = await this.userService.index();
  }

  viewUser(user: User) {
    this.router.navigate(['/users/' + user.id]);
  }

  ngOnInit() {
    this.getUsers();
  }
}
