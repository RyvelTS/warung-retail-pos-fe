import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

export interface LoginData{
  email:string,
  password:string
}

export interface RegisterData{
  username:string
  email:string,
  password:string,
  confirmPassword:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  async login(data:LoginData){
    let token = null;
    try {
      console.log('LOGGED IN:', data)
      // token = await axios.post(`${environment.api_url}/login`, data);
    } catch (error) {
    }

    return token;
  }

  async register(data:RegisterData){
    try {
      let res = await axios.post(`${environment.api_url}/users`, data);
      console.log('REGISTERED',res)
    } catch (error) {
      return false;
    }

    return true;

  }
}
