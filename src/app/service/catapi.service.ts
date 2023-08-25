import { HttpClient , HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})

export class CategapiService {

  apiUrl = 'http://localhost:8080/ma-gpro-gpao-rest/apiCategorie/';
  constructor(private http:HttpClient) { }



  public GetallCategorie(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl+'allCategoerie');
  }

  public createCategorie(Categorie: any):Observable<void> {
    return this.http.post<void>(this.apiUrl+'createCateg', Categorie);
  }

  public GetCategorieByDesign(id:any):Observable<Categorie[]>{
  //  return this.http.get<Categorie>(this.apiUrl + 'getCategById:' + id).pipe(
    //  map(response=>response.lib_categorie)
    //);
    let parmt = new HttpParams().set('categorieId',id);
    return this.http.get<Categorie[]>('http://localhost:8080/ma-gpro-gpao-rest/apiCategorie/allCategoerie' ,{params:parmt})
  }

  public GetCompetenceByCategorie(selectedcategorie:string):Observable<any>{
    let parmt = new HttpParams().set('categorie',selectedcategorie);
    return this.http.get('http://localhost:8080/ma-gpro-gpao-rest/apiCompetence/getAllCompetence',{params: parmt})
  }

/*  public GetCompetenceByCategorie(selectedcategorie:string):Observable<any>{
    let parmt = new HttpParams().set('categorie',selectedcategorie);
    return this.http.get('http://localhost:3000/competences',{params: parmt})
  }*/

  public GetCategorieById(id: any): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.apiUrl + 'getCategById:' + id);

  }


  public UpdateCategorie( Categorie: any):Observable<void> {
    return this.http.put<void>(this.apiUrl + 'updateCateg' , Categorie);
  }

  public deleteCategorie(id: any):Observable<void> {
    return this.http.delete<void>(this.apiUrl + `delete:${id}`);

  }
}

