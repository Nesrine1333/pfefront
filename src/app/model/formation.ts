import { Suivi } from "./suivi";

export interface Formation {
    id:number,
    titre:string,
    description: string ,
    dateFormation :Date,
    state:boolean,
    suiviValue:Suivi 
}
