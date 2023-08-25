import { Injectable } from '@angular/core';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Suivi} from '../model/suivi';

@Injectable({
  providedIn: 'root'
})
export class SuiviService {

 
  apiUrl = 'http://localhost:8080/ma-gpro-gpao-rest/suivi';
  constructor(private http:HttpClient) { }



  public GetallSuivi(): Observable<Suivi[]> {
    return this.http.get<Suivi[]>(this.apiUrl+'/allSuivi');
  }

  public createSuivi(Suivi: any):Observable<any> {
    return this.http.post<any>(this.apiUrl+'/creer', Suivi);
  }


  public GetSuiviByFormation(selectedformation:string):Observable<any>{
    let parmt = new HttpParams().set('idsuivi',selectedformation);
    return this.http.get('http://localhost:8080/ma-gpro-gpao-rest/suivi/allSuivi',{params: parmt})
  }

  public GetSuiviById(id: any):Observable<Suivi> {
    return this.http.get<Suivi>(this.apiUrl + '/getById:' + id);

  }

  public UpdateSuivi( Suivi: any):Observable<any> {
    return this.http.put<any>(this.apiUrl + '/modifier', Suivi);
  }

  public deleteSuivi(id: any):Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/supprimer:${id}` + id);

  }
}
