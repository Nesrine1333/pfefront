import { Formation } from '../model/formation';
import { Personnel} from '../model/personnel' ;

export interface Suivi {
  id_suivi: number,
  formation_id: number,
  personnel_id: number,
}
