import { Injectable } from '@angular/core';
import axios from '../instances/axios-config';
import { environment } from '../../../environments/environment';

export interface LoginData{
  email:string,
  password:string
}

export interface RegisterData{
  name:string
  email:string,
  password:string,
  confirmPassword:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated:boolean = false;
  userData:{
    name:string,
    email:string
  } = {
    name:'',
    email:''
  }

  constructor() { }

  async login(data:LoginData){
    try {
      let res = await axios.post(`/auth/login`,data);
      this.userData.name = res.data.userData.name;
      this.userData.email = res.data.userData.email;
      console.log("Logged in: ",res);
    } catch (error) {
      console.log("Error Occured", error);
    }

    return this.userData;
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

  async isAuthenticated():Promise<boolean>{
    try {
      const res = await axios.get('/auth/status');
      this.authenticated = res.data;
    } catch (error) {
      return false;
    }

    return this.authenticated;
  }

  async logout(): Promise<void>{
    try {
      await axios.post('/auth/logout');
    } catch (error) {
      console.log(error)
    }
      document.cookie = 'jwt=; Max-Age=0; path=/; domain=' + window.location.hostname;
  }
}
