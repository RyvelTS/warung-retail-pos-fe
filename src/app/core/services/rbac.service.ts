import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import axiosInstance from '../instances/axios-config';

@Injectable({
  providedIn: 'root'
})
export class RbacService {

  constructor(
    private authService: AuthService
  ) { }

  checkPermission(permissions: string[], user?: User) {
    if (!user) {
      user = this.authService.user;
    }

    let userPermissions: string[] = [];
    let rolePermissions = user.roles.flatMap(role => role.permissions).map((permission) => permission);
    if (rolePermissions) {
      userPermissions = rolePermissions.flatMap((permission: any) =>
        permission.actions.map((action: string): string => `${action}:${permission.resource}`)
      )
    }

    return permissions.every((permission: string) => userPermissions.includes(permission));
  }

  async getPermissions() {
    try {
      let res = await axiosInstance.get('/permissions');
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }
}
