import { Injectable } from '@angular/core';
import{ HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  apiURL="http://localhost:8080/mt-gpro-commun-rest/user/"

 // ProceedLogin(){
   //   return this.http.get<any>('http://localhost:3000/login');}

  getAllAdmin():Observable<Admin[]>{
    return this.http.get<Admin[]>(this.apiURL+`getAll`)
  }

  getadminById(id: any):Observable<Admin>{
    return this.http.get<Admin>(this.apiURL+'getById:'+id)
  }

  getadminByEmail(email:string):Observable<any>{
    let parameter1= new HttpParams().set('email',email)
    return this.http.get(this.apiURL+'getAll',{params:parameter1});
  }

  updateadmin(admin:any):Observable<any>{
    return this.http.put<any>(this.apiURL+`update`, admin);
  }
}
