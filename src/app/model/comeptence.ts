import {Categorie} from "./categorie";
import {Niveau } from "./niveau";

export interface Comeptence {  
        id:number,
        designation:string ,
        categorieId:number,
        niveau:Niveau[]

}
