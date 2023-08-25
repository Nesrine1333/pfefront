import{Comeptence} from "./comeptence" ;
import { Personnel} from '../model/personnel' ;

export interface Niveau {

    id: number,
    libelle: string,
    competence_id: number,
    personnel_id: number,
    isEdit: false;

}

