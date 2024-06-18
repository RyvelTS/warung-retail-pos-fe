import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  isTokenExpired(token: string): boolean {
    const decodedToken = this.parseJwt(token);
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }

    const expiryTime = decodedToken.exp * 1000; //convert to milliseconds
    const currentTime = new Date().getTime();

    return currentTime > expiryTime;
  }

  private parseJwt(token: string) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }
}
