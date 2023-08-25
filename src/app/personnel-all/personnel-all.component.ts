import { Component, OnInit } from '@angular/core';
import {NiveauService} from '../service/niveau.service';
import { Niveau } from '../model/niveau';
import { PersonnelService } from '../service/personnel.service';
import { Personnel} from '../model/personnel' ;
import { Observable, map } from 'rxjs';
import { RestapiService } from '../service/compapi.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNiveauComponent } from '../update-niveau/update-niveau.component';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-personnel-all',
  templateUrl: './personnel-all.component.html',
  styleUrls: ['./personnel-all.component.css']
})
export class PersonnelAllComponent implements OnInit {

  constructor( private niveauService :NiveauService,private perservice:PersonnelService,private service: RestapiService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getAllNiveau();
  }

  displayColumns: string[]=["competence_id" , "personnel_id","libelle","action"]
  NiveauId!:any;
getAllNiveau(){
  this.niveauService.Getallniveau().subscribe(data=>{
    this.NiveauId=data;
 
  })
}
EditNiveau(id: any){
 this.OpenPupUpdate(id);
  
}

addNiveau(){

}

OpenPupUpdate(id :any){
  this.dialog.open(UpdateNiveauComponent,{
        width: '600px',
        height: '500px',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '200ms',
        data: {
          id:id
        }
   })
}

OpenPupadd(id :any){
  this.dialog.open(UpdateNiveauComponent,{
        width: '600px',
        height: '500px',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '200ms',
        data: {
          id:id
        }
   })
}

RemoveNiveau(id:any){
  alertify.confirm("Remove competence", "are you sure ?", () => {
    this.niveauService.deleteniveau(id).subscribe(r => {
      this.ngOnInit();
    });
     }, function () { })
}


personneell!:Personnel;
getPersonnelById(id:any){
  this.perservice.GetpersonnelById(id).subscribe(data=>{
    this.personneell= data
  })

}

personnelNames: { [key: string]: Observable<string> } = {};
public getPersonnelName(id: any) {
  if (!this.personnelNames[id]) {
    this.personnelNames[id] = this.perservice.GetpersonnelById(id).pipe(
      map(data => data.nom)
    );
  }
  return this.personnelNames[id];
  }

  CompetenceName: { [key: string]: Observable<string> } = {};
  public getCompetenceDesign(id:any):Observable<string>{
    if(!this.CompetenceName[id]){
      this.CompetenceName[id]=this.service.GetCompetenceById(id).pipe(
        map(data=> data.designation)
      )
    }
    return  this.CompetenceName[id]
  }

  closePopup(){
    this.dialog.closeAll();
      this.ngOnInit();
  }
}
