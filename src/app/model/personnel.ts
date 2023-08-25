import {Niveau } from "./niveau";

export interface Personnel {

      id: number,
      matricule: string,
      nom: string,
      prenom: string,
      indirect: boolean,
      serviceCiId: number,
      poste: string,
      idSite: number,
      controleur: boolean,
      inspecteur: boolean,
      matriculeId: number,
      testeurLabo: boolean,
      evaluateur: boolean,
      monitrice: boolean,
      controleurFinChaine: boolean,
      controleurEnCours: boolean,
      suiviId:number,
      niveaux:Niveau
}
