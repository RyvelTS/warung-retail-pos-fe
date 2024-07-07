import { Injectable } from '@angular/core';
import axiosInstance from '../../../core/instances/axios-config';
import { User } from '../../../core/models/user';
import { Query } from '../../../core/models/query';
import { Response } from '../../../core/models/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async index(query: Query): Promise<Response> {
    let users: User[] = [];
    let response: Response = {
      type: 'info',
      message: '',
      status: 200,
      data: {
        total: 0,
        perPage: 15,
        currentPage: 1,
        lastPage: 1,
        path: "",
        users: []
      }
    }

    try {
      const res = await axiosInstance.get('/users', {
        params: {
          page: query.page ?? 1,
          perPage: query.perPage ?? 15,
          searchTerm: query.search?.keyword ?? '',
          searchField: query.search?.field ?? '',
          sortField: query.sort?.field ?? '',
          sortOrder: query.sort?.direction ?? 'asc',
        }
      });

      response.status = res.status;
      response.message = 'Successfully retrieved user data';
      users = res.data.users.map((userData: any) => {
        const user: User = new User(
          userData.id,
          userData.name,
          userData.email,
          []
        );

        return user;
      });

      response.data.users = users
      response.data.total = res.data.total;
      response.data.lastPage = res.data.lastPage;
      response.data.currentPage = res.data.currentPage;
      response.data.perPage = res.data.perPage;
    } catch (error: any) {
      console.error(error)
      error = error.toJSON();
      response.status = error.status;
      switch (error.status) {
        case 404:
          response.type = 'danger'
          response.message = 'User not found'
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

  async find(id: string): Promise<User | undefined> {
    let user: User | undefined = undefined;
    try {
      const res = await axiosInstance.get('/users/' + id);
      user = new User(
        res.data.id,
        res.data.name,
        res.data.email,
        res.data.roles
      );
    } catch (error) {
      console.error(error)
    }

    return user;
  }

  async update(user: User): Promise<User | undefined> {
    try {
      await axiosInstance.patch('/users/' + user.id, user);
    } catch (error) {
      console.error(error)
      return undefined
    }

    return user;
  }
}
