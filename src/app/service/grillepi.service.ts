import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Niveau } from '../model/niveau';

@Injectable({
  providedIn: 'root'
})
export class GrillepiService {


  apiNiveaUrl ='http://localhost:8080/ma-gpro-gpao-rest/niveau/allNiveau'
  constructor(private http:HttpClient) { }


  getNiveauForPersonnelAndCompetence(personnelId: number, competenceId: number): Observable<string> {
    return this.http.get<Niveau[]>('http://localhost:8080/ma-gpro-gpao-rest/niveau/allNiveau').pipe(
      map((niveaux: Niveau[]) => {
        const niveau = niveaux.find(n => n.personnel_id === personnelId && n.competence_id === competenceId);
        return niveau ? niveau.libelle : '';
      })
    );
  }
}
