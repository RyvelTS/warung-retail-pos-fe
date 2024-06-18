import { Injectable } from '@angular/core';
import axiosInstance from '../../../core/instances/axios-config';
import { User } from '../../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async index(): Promise<User[]> {
    let users: User[] = [];
    try {
      const res = await axiosInstance.get('/users');
      users = res.data.map((userData: any) => {
        const user: User = new User(
          userData.id,
          userData.name,
          userData.email,
          []
        );

        return user;
      });
    } catch (error) {
      console.error(error)
    }

    return users;
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
