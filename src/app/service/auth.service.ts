import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInAdmin: any;

  constructor() {
    const adminData = sessionStorage.getItem('loggedInAdmin');
    if (adminData) {
      this.loggedInAdmin = JSON.parse(adminData);
    }
  }

  setLoggedInAdmin(admin: any) {
    this.loggedInAdmin = admin;
    sessionStorage.setItem('loggedInAdmin', JSON.stringify(admin));
  }

  getLoggedInAdmin() {
    return this.loggedInAdmin;
  }

  clearLoggedInAdmin() {
    this.loggedInAdmin = null;
    sessionStorage.removeItem('loggedInAdmin');
  }

  
}