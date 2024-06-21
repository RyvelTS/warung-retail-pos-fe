import { Injectable } from '@angular/core';
import axiosInstance from '../../../core/instances/axios-config';
import { RbacService } from '../../../core/services/rbac.service';
import { Role } from '../../../core/models/role';
import { Response } from '../../../core/models/response';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private rbacService: RbacService
  ) { }

  async index(): Promise<Role[]> {
    let roles: Role[] = [];

    if (!this.rbacService.checkPermission(['read:roles'])) {
      return roles;
    }

    try {
      const res = await axiosInstance.get('/roles');
      roles = res.data;
    } catch (error) {
      console.error(error);
    }

    return roles;
  }

  async updateRole(roles: Role[]) {
    let response: Response = new Response(
      'info',
      '',
      200,
      undefined
    );

    try {
      let res = await axiosInstance.patch('/roles', roles);
      response.data = res.data;
      response.message = 'Successfully update roles';
      response.type = 'success';
    } catch (error: any) {
      console.error(error)
      error = error.toJSON();
      response.status = error.status;
      switch (error.status) {
        case 404:
          response.type = 'danger'
          response.message = 'Role not found'
          break;

        case 403:
          response.type = 'danger'
          response.message = 'Access denied, Please contact the administrator for further assistance'
          break;

        case 400:
          response.type = 'warning'
          response.message = 'Please ensure your input format'
          break;

        default:
          response.type = 'danger'
          response.message = 'Sorry, something went wrong. Please try again later.'
          break;
      }
    }

    return response;
  }
}
