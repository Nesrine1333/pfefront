import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from '../model/formation';

@Injectable({
  providedIn: 'root'
})
export class FormapiService {

  apFormationiUrl = 'http://localhost:8080/ma-gpro-gpao-rest/formation';
  constructor(private http:HttpClient) { }



  public GetallFormation(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apFormationiUrl+'/getAllFormation');
  }

  public createFormation(Formation: any):Observable<any> {
    return this.http.post<any>(this.apFormationiUrl+'/createFormation', Formation);
  }


  public GetFormationById(id: any): Observable<Formation> {
    return this.http.get<Formation>(this.apFormationiUrl + '/getFormationById:' + id);

  }

  public UpdateFormation( Formation: any):Observable<any> {
    return this.http.put<any>(this.apFormationiUrl + '/updateFormation' , Formation);
  }

  public deleteFormation(id: any):Observable<void> {
    return this.http.delete<void>(this.apFormationiUrl + `/deleteFormation:${id}`);

  }
}
