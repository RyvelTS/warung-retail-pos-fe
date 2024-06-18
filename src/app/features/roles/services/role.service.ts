import { Injectable } from '@angular/core';
import axiosInstance from '../../../core/instances/axios-config';
import { RbacService } from '../../../core/services/rbac.service';
import { Role } from '../../../core/models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private rbacService: RbacService
  ) { }

  async getRoles() {
    try {
      let res = await axiosInstance.get('/roles');
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }

  async updateRole(roles: Role[]) {
    console.log(roles);

    try {
      let res = await axiosInstance.patch('/roles', roles);
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }
}
