import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {Suivi} from '../model/suivi';
import { Niveau} from '../model/niveau';
import { Personnel} from '../model/personnel' ;
import {Observable, Subject} from 'rxjs';
import {PersonnelService} from '../service/personnel.service';
import {SuiviService} from '../service/suivi.service';
import { map } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-personnelsuivi',
  templateUrl: './personnelsuivi.component.html',
  styleUrls: ['./personnelsuivi.component.css']
})
export class PersonnelsuiviComponent implements OnInit {


  personnel!:Personnel[] ;
  suivi!:Suivi[];
  selectedFormation!:any;
  suiviID!:Suivi[];

  personneell!:Personnel;
  dtTrigger:Subject<any>=new Subject<any>();
  dtElement!: DataTableDirective;

  constructor(private dialog:MatDialog ,private perservice:PersonnelService,private suiservice:SuiviService 
    , @Inject(MAT_DIALOG_DATA) public dataFormation:any ) { }

  

getAllSuivi(){
  this.suiservice.GetallSuivi().subscribe(data=>{
    this.suiviID=data;
  })

}



personnelNames: { [key: string]: Observable<string> } = {};
public getPersonnelName(id:any):Observable<string>{
  if(!this.personnelNames[id]){
    this.personnelNames[id] = this.perservice.GetpersonnelById(id).pipe(
      map(data=>data.nom)
    );
  }
  return this.personnelNames[id];
}

getPersonnelById(id:any){
  this.perservice.GetpersonnelById(id).subscribe(data=>{
    this.personneell= data
  })

}

  NiveauParComp(dataFormation:any){
    this.suiservice.GetSuiviByFormation(dataFormation).subscribe(
      result=>{
        this.suivi=result ;
      }
      )
    }


  getAllPersonnel(){
    this.perservice.GetallPersonnel().subscribe(data=>{
      this.personnel = data;
  
    })
  }


  closePopup(){
    this.dialog.closeAll();
  }

  ngOnInit() {

    this.selectedFormation=this.dataFormation;
    console.log(this.selectedFormation);
    
    this.getAllSuivi();
    this.getAllPersonnel;
    this.getPersonnelName; 
 

  this.getPersonnelName(154).subscribe(name=>{
    console.log(name);
  })

}

}
