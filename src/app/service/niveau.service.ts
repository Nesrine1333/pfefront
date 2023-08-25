import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Niveau} from '../model/niveau';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  
  apiUrl = 'http://localhost:8080/ma-gpro-gpao-rest/niveau';
  constructor(private http:HttpClient) { }



  public Getallniveau(): Observable<Niveau[]> {
    return this.http.get<Niveau[]>(this.apiUrl+'/allNiveau');
  }

  public createniveau(niveau: any) {
    return this.http.post(this.apiUrl+'/create', niveau);
  }

 /* public GetNiveauByCompetence(selectedcompetence:string):Observable<Niveau[]>{
    let parmt = new HttpParams().set('idniveau',selectedcompetence);
    return this.http.get<Niveau[]>('http://localhost:3000/niveau',{params: parmt})
  } worked*/


 /* public GetCompetenceByniveau(selectedniveau:string):Observable<any[]>{
    let parmt = new HttpParams().set('competence',selectedniveau);
    return this.http.get<any[]>('http://localhost:3000/competences',{params: parmt})
  }*/

  public GetniveauById(id: any): Observable<Niveau> {
    return this.http.get<Niveau>(this.apiUrl + '/getById:' + id);

  }

  public Updateniveau(niveau: any):Observable<any> {
    return this.http.put(this.apiUrl + '/modifier', niveau);
  }

  public deleteniveau(id: any) {
    return this.http.delete(this.apiUrl + '/supprimer:' + id);

  }
}
