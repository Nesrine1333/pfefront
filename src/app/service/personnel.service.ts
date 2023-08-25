import { Injectable } from '@angular/core';
import { Personnel} from '../model/personnel' ;
import { Observable } from 'rxjs';
import { HttpClient , HttpParams } from '@angular/common/http';
import { Niveau } from '../model/niveau';
import { Comeptence } from '../model/comeptence';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  apiUrl = 'http://localhost:8080/ma-gpro-gpao-rest/personnel';
  apiNivauUrl = 'http://localhost:8080/ma-gpro-gpao-rest/niveau';
  apiCompUrl = 'http://localhost:8080/ma-gpro-gpao-rest/apiCompetence/'
  constructor(private http:HttpClient) { }



  public GetallPersonnel(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.apiUrl +'/all');
  }

  public createpersonnel(personnel: any) {
    return this.http.post(this.apiUrl+'/creer', personnel);
  }


  public GetpersonnelById(id: any): Observable<Personnel> {
    return this.http.get<Personnel>(this.apiUrl + '/getById:' + id);

  }


  public Updatepersonnel(id: any, personnel: any) {
    return this.http.put(this.apiUrl + '/modifier' + id, personnel);
  }

  public deletepersonnel(id: any) {
    return this.http.delete(this.apiUrl + '/supprimer:' + id);

  }

  public GetNiveauByCompetence(selectedcompetence:string):Observable<any>{
    let parmt = new HttpParams().set('competenceId',selectedcompetence);
    return this.http.get('http://localhost:8080/ma-gpro-gpao-rest/niveau/allNiveau',{params: parmt})
  }

  public GetSuiviByFormation (selectedFormation:string):Observable<any>{
    let parmt=new HttpParams().set('suiviValue',selectedFormation);
    return this.http.get('http://localhost:8080/ma-gpro-gpao-rest/suivi/allSuivi',{params:parmt})
  }


  public filterPersonnelByNiveau(selectedNiveau:string):Observable<any[]>{
    let parmt = new HttpParams().set('niveau',selectedNiveau);
    return this.http.get<any[]>('http://localhost:8080/ma-gpro-gpao-rest/niveau/allNiveau',{params: parmt})
  }

  public GetniveauById(id: any): Observable<Niveau> {
    return this.http.get<Niveau>(this.apiNivauUrl + '/getById:' + id);

  }
  public GetCompetenceById(id: any): Observable<Comeptence> {
    return this.http.get<Comeptence>(this.apiCompUrl + ` getById:`  + id);

  }

}

