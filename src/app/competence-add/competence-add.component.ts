 import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RestapiService } from '../service/compapi.service';
import * as alertify from 'alertifyjs';
import {MatSelectModule} from '@angular/material/select';
import { CategapiService } from '../service/catapi.service'
import { Categorie } from '../model/categorie';
import {FormControl} from '@angular/forms';
import {Observable, Subject, map} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgxSelectDropdownComponent } from 'ngx-select-dropdown';
import {NgSelectOption} from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-competence-add',
  templateUrl: './competence-add.component.html',
  styleUrls: ['./competence-add.component.css']
})
export class CompetenceAddComponent implements OnInit,OnDestroy {

  constructor(private builder:FormBuilder, private api:RestapiService ,private catapi:CategapiService,
     private dialog:MatDialog , @Inject(MAT_DIALOG_DATA) public data:any) { }
  categorie! :Categorie[];
  dtTrigger:Subject<any>=new Subject<any>();
  dtElement!: DataTableDirective;

 

     
  
  
  
  editedData:any;
     getAllcategorie() {
      this.catapi.GetallCategorie().subscribe(data => {
        this.categorie = data;
        // this.finaldata.paginator= this._paginator;
        //console.log(this.finaldata);
  
      });
    }

    categorieComp :{ [key: string]: Observable<string> } = {};
 public getCategForCompetence(id:any){
  if(!this.categorieComp[id])
  this.categorieComp[id]=this.api.GetCategorieForCompetence(id).pipe(
    map(data=>data.lib_categorie)
  )
  return this.categorieComp[id] ;
 }

  ngOnInit(): void {
    

    if(this.data!='' && this.data!=null){
      this.api.GetCompetenceById(this.data.id).subscribe(res=>{
        this.editedData=res ;
        this.competenceform.patchValue({ id: this.editedData.id,
          designation: this.editedData.designation, categorieId: this.editedData.categorieId
        });
        
      });

    }
    this.getAllcategorie();
  }

  ngOnDestroy() {
    // Unsubscribe from the dtTrigger Subject and destroy the DataTable instance
    this.dtTrigger.unsubscribe();
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
    }
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

  categorieControl = new FormControl('', Validators.required);
  competenceform=new FormGroup({
    id:new FormControl({value:' ',disabled:true}),
    designation:new FormControl('',Validators.required),
    categorieId:this.categorieControl,

    
  })

  

  SaveCompetence(){
    console.log(1);
    if(this.competenceform.valid){
    this.api.GetallCompetences().subscribe(res=>{
      const user =res.find((a:any)=>{
        return a.designation== this.competenceform.value.designation &&
        a.categorieId == this.competenceform.value.categorieId
      });
      if (user){
        Swal.fire({
          icon: 'warning',
          title: 'Compétence déja existe',
          text: 'verifier la list des compétences',
        })
      }else {
      const randomId = Math.floor(Math.random() * 1000);
      const competence = {
        id: randomId,
        designation: this.competenceform.value.designation,
        categorieId: this.competenceform.value.categorieId,
      };
   
      console.log("else");
      this.api.createCompetence(competence).subscribe(response =>{
      alertify.set('notifier', 'position', 'top-right');
      alertify.notify('Saved successfully', 'success', 5);
        this.closePopup() },
        error => {
          console.log("Error:", error);
      })
   // }
    
    
  }
})
  }
}
  closePopup(){
    this.dialog.closeAll();
    this.ngOnDestroy();
      this.rerender();
      this.ngOnInit();
  }
}

 /*  */
