import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comeptence } from '../model/comeptence';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})

export class RestapiService {

  apiUrl = 'http://localhost:8080/ma-gpro-gpao-rest/apiCompetence';
  apiCatUrl = 'http://localhost:8080/ma-gpro-gpao-rest/apiCategorie/';
  constructor(private http:HttpClient) { }



  public GetallCompetences(): Observable<Comeptence[]> {
    return this.http.get<Comeptence[]>(this.apiUrl+'/getAllCompetence');
  }

  public createCompetence(competence: any):Observable<any> {
    return this.http.post<any> (this.apiUrl+'/create' , competence);
  }


  public GetCompetenceById(id: any):Observable<Comeptence> {
    return this.http.get<Comeptence>(this.apiUrl + '/getById:' + id);

  }

  public UpdateCompetence( competence: any):Observable<any>{
    return this.http.put<any>(this.apiUrl + ` /update` , competence);
  }

  public GetCategorieForCompetence(id:any):Observable<Categorie>{
    return this.http.get<Categorie>(this.apiCatUrl+` getCategById:` +id) ;

  }


  public getCompParCat(serachValue: string):Observable<Comeptence[]>{
    return this.http.get<Comeptence[]>(
      `http://localhost:8080/ma-gpro-gpao-rest/apiCompetence/getAllCompetence?categorieId_like=${serachValue}`
    )
  }
 

  /*public UpdateCompetence(id: any, competence: any) {
    return this.http.put(this.apiUrl + '/' + id, competence);
  }*/

  public deleteCompetence(id: any):Observable<void> {
    return this.http.delete<void>(this.apiUrl + `/delete:${id}` );

  }

  public getCompetenceOfSelectedCategorie(selectedcategorie:string):Observable<any>{
    let parameter1= new HttpParams().set('categorieId',selectedcategorie)
    return this.http.get("http://localhost:8080/ma-gpro-gpao-rest/apiCompetence/getAllCompetence",{params :parameter1});
  }

  
}

