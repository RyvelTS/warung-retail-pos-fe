import { Injectable } from '@angular/core';
import axios from '../instances/axios-config';
import { environment } from '../../../environments/environment';
import { JwtService } from './jwt.service';
import { User } from '../models/user';

export interface LoginData {
  email: string,
  password: string
}

export interface RegisterData {
  name: string
  email: string,
  password: string,
  confirmPassword: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean = false;

  private auth: {
    status: boolean,
    token?: string
  } = {
      status: false
    }

  user: User = {
    id: '',
    name: '',
    email: '',
    roles: []
  }

  constructor(
    private jwtService: JwtService
  ) { }

  async login(data: LoginData) {
    try {
      let res = await axios.post(`/auth/login`, data);
      this.user.name = res.data.userData.name;
      this.user.email = res.data.userData.email;
      console.log("Logged in: ", res);
    } catch (error) {
      console.log("Error Occured", error);
    }

    return this.user;
  }

  async register(data: RegisterData) {
    try {
      let res = await axios.post(`${environment.api_url}/users`, data);
      console.log('REGISTERED', res)
    } catch (error) {

      return false;
    }

    return true;
  }

  async isAuthenticated(): Promise<boolean> {
    if (this.auth.token === undefined) {
      await this.validateAuth();
    }

    this.auth.status = Boolean(this.auth.token && !this.jwtService.isTokenExpired(this.auth.token));
    return this.auth.status;
  }

  private async validateAuth() {
    try {
      const res = await axios.get('/auth/user');
      this.auth.token = res.data.token;
      this.user.id = res.data.id;
      this.user.name = res.data.name;
      this.user.email = res.data.email;
      this.user.roles = res.data.roles;
    } catch (error) {
      console.log(error)
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.log(error)
    }

    this.auth.token = undefined;
    this.user.name = '';
    this.user.email = '';
    this.user.roles = [];
    document.cookie = 'jwt=; Max-Age=0; path=/; domain=' + window.location.hostname;
  }
}
