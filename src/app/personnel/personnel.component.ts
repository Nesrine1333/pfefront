import { Component,  Inject, OnInit ,ViewChild } from '@angular/core';
import {PersonnelService} from '../service/personnel.service';
import {Observable, Subject} from 'rxjs';
import { Personnel} from '../model/personnel' ;
import {Suivi} from '../model/suivi';
import { Niveau} from '../model/niveau';
import {NiveauService} from '../service/niveau.service';
import {SuiviService} from '../service/suivi.service';
import {CompetenceComponent} from '../competence/competence.component';
import { Comeptence } from '../model/comeptence';
import { RestapiService } from '../service/compapi.service';
import { Router,ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {FormControl ,FormBuilder, FormGroup} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as alertify from 'alertifyjs';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { UpdateNiveauComponent } from '../update-niveau/update-niveau.component';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  Niveau!:FormGroup;
  constructor(private route: ActivatedRoute,private perservice:PersonnelService ,private suiservice:SuiviService ,private niveauService :NiveauService ,private service: RestapiService 
   , @Inject(MAT_DIALOG_DATA) public datacomp:any , private dialog:MatDialog,private builder:FormBuilder ,private api:RestapiService) { 
    this.Niveau=this.builder.group({
      id: new FormControl(''),
      libelle: new FormControl('')
    })
   }

  personnel!:Personnel[] ;
 
  NiveauId!:Niveau[];

  selectedComp!:any;

  personneell!:Personnel;
  selectedNiveau!: any ;

  dtTrigger:Subject<any>=new Subject<any>();
  dtElement!: DataTableDirective;
  dtOptions:DataTables.Settings={};

  competence!: Comeptence[] ;
 
  
getAllNiveau(){
  this.niveauService.Getallniveau().subscribe(data=>{
    this.NiveauId=data;
 
  })
}

getAllPersonnel(){
  this.perservice.GetallPersonnel().subscribe(data=>{
    this.personnel = data;

  })
}


 /* niveau!:Niveau[] ;
  NiveauParComp(datacomp:any){
    this.niveauService.GetNiveauByCompetence(datacomp).subscribe(
      result=>{
        this.niveau=result ;
      }
      )
    }*/
    
    personnelNames: { [key: string]: Observable<string> } = {};
   public getPersonnelName(id: any): Observable<string> {
    if (!this.personnelNames[id]) {
      this.personnelNames[id] = this.perservice.GetpersonnelById(id).pipe(
        map(data => data.nom)
      );
    }
    return this.personnelNames[id];
    }

  editedData:any;
  niveauBycomp: any ;
  PersonnelNiveau: any;
  personneldata:any;
  ngOnInit() {
this.selectedComp=this.datacomp;
    console.log(this.selectedComp);
    this.dtTrigger.next(null);
this.getAllNiveau();
this.getAllPersonnel
    this.getPersonnelName;
    this.downloadaCsvFile;
    
    //this.PersonnelNiveau=this.perservice.filterPersonnelByNiveau(this.niveauBycomp);
    //console.log(this.PersonnelNiveau);
    this.getPersonnelName(154).subscribe(name => {
      console.log(name); // Output: The personnel's name
      // You can use the value here or perform any other operations with it
    });



  
  }


  getPersonnelById(id:any){
    this.perservice.GetpersonnelById(id).subscribe(data=>{
      this.personneell= data
    })
 
  }


  closePopup(){
    this.dialog.closeAll();
      this.ngOnInit();
  }



  ////Download file 
downloadaCsvFile(item : string){

  var options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    title: this.datacomp.designation ,
    useBom: true,
    noDownload: false,
    headers: ["libelle", "Personnel Name"]
  };
 
 new ngxCsv(this.NiveauId, 'Personnal_list', options);
 
}
 ListNiveau =['E','O','F','N']
isEdit=false;
 onEdit(id:any){
 //item.isEdit= true ;
 this.dialog.open(UpdateNiveauComponent,{
  width: '600px',
      height: '500px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '200ms',
      data: {
        id: id
      }
 })

}



update(item: Niveau) {
  const niveauValue = this.Niveau.value;
  this.niveauService.Updateniveau(niveauValue).subscribe(
    (response) => {
      // Handle success response
      console.log('Update successful:', response);
    },
    (error) => {
      // Handle error response
      console.error('Update failed:', error);
    }
  );
}
  }

