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
import {FormControl ,FormBuilder} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { GrillepiService } from '../service/grillepi.service';
import { data } from 'jquery';


@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})
export class GrilleComponent implements OnInit {

  constructor(private route: ActivatedRoute,private perservice:PersonnelService ,private suiservice:SuiviService ,private niveauService :NiveauService ,private service: RestapiService 
   , private dialog:MatDialog,private builder:FormBuilder ,private api:RestapiService ,private grille:GrillepiService) { }
 
 
    @ViewChild(DataTableDirective, { static: false })
   personnel!:Personnel[] ;
  
   NiveauId!:Niveau[];
 
   selectedComp!:any;
 
   personneell!:Personnel;
   selectedNiveau!: any ;
 
   dtTrigger:Subject<any>=new Subject<any>();
   dtElement!: DataTableDirective;
   dtOptions:DataTables.Settings={};
 
   competence!: Comeptence[] ;
  
   getAllCompetence() {
    this.service.GetallCompetences().subscribe(data => {
      this.competence = data; 
      this.rerender();
      // this.finaldata.paginator= this._paginator;
      //console.log(this.finaldata);

    });
  }

  rerender(): void {
    // Destroy the DataTable instance and trigger a new rendering
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
     }
  ngOnDestroy(): void {
    // Unsubscribe from the dtTrigger Subject and destroy the DataTable instance
   
    this.dtTrigger.unsubscribe();
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    }
  }
   
 getAllNiveau(){
   this.niveauService.Getallniveau().subscribe(data=>{
     this.NiveauId=data;
     this.dtTrigger.next(null);
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


     
 NiveauaComp :{ [key: string]: Observable<string> } = {};
 public getCompetenceForNiveau(id:any){
  if(!this.NiveauaComp[id])
  this.NiveauaComp[id]=this.perservice.GetCompetenceById(id).pipe(
    map(data=>data.designation)
  )
  return this.NiveauaComp[id] ;
 }
 
   editedData:any;
   niveauBycomp: any ;
   PersonnelNiveau: any;
   personneldata:any;

   ngOnInit():void {

     
 this.getAllNiveau();
 this.getAllPersonnel
 this.getAllCompetence;
     this.getPersonnelName;
     this.downloadaCsvFile;
     this.getNiveauGrille ;
     //this.PersonnelNiveau=this.perservice.filterPersonnelByNiveau(this.niveauBycomp);
     //console.log(this.PersonnelNiveau);
     this.getPersonnelName(154).subscribe(name => {
       console.log(name); // Output: The personnel's name
       // You can use the value here or perform any other operations with it
     });
 
 
 
   
   }

   NiveauName!: String;
 
   getNiveauGrille (idpersonnel:any ,idcompetence:any){
    this.grille.getNiveauForPersonnelAndCompetence(idcompetence ,idcompetence).subscribe(data=>{
      this.NiveauName=data 
    })
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
     title: "Grille de Polyvalence" ,
     useBom: true,
     noDownload: false,
     headers: ["libelle", "Personnel Name"]
   };
  
  new ngxCsv(this.NiveauId, 'Personnal_list', options);
  
 }

 displayedColumns: string[] = ['personnel', 'competence', 'niveau'];
 dataSource = this.getAllNiveau();


 
}
