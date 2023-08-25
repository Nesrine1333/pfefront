import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Admin } from '../model/admin';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private loggedInAdmin!: Admin;
  constructor() { }

  private loggedInForm!: FormGroup;
  setLoggedInAdmin(admin: Admin) {
    this.loggedInAdmin = admin;
  }

  getLoggedInAdmin(): Admin {
    return this.loggedInAdmin;
  }

}
