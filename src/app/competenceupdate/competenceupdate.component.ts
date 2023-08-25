import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-competenceupdate',
  templateUrl: './competenceupdate.component.html',
  styleUrls: ['./competenceupdate.component.css']
})
export class CompetenceupdateComponent implements OnInit {

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

 ngOnInit() {
   
   if(this.data!='' && this.data!=null){
      this.getAllcategorie();
     this.api.GetCompetenceById(this.data.id).subscribe(res=>{
       this.editedData=res ;
       this.competenceform.setValue({ id: this.editedData.id,
         designation: this.editedData.designation, categorieId: this.editedData.categorieId
       })
       
     });

   }
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
 competenceform=this.builder.group({
   id:this.builder.control({value:'',disabled:true}),
   designation:this.builder.control('',Validators.required),
   categorieId:this.categorieControl,

   
 })


 SaveCompetence(){
   console.log(1);
   
   if(this.competenceform.valid){
     console.log("this.competenceform.valid");
     
     const editid=this.competenceform.getRawValue().id;
     if(this.editedData!='' && editid!=null){
       console.log("this.editedData");
       this.api.UpdateCompetence(this.competenceform.getRawValue()).subscribe(response =>{
        alertify.set('notifier', 'position', 'top-right');
        alertify.notify('Updated successfully', 'success', 5);
          this.closePopup();
     })
   }else{
     console.log("else");
     
     this.api.createCompetence(this.competenceform.getRawValue()).subscribe(response =>{
      alertify.success("saved sucessfully");
       this.closePopup();
     })
   }
 }
}
 closePopup(){
   this.dialog.closeAll();
   this.ngOnDestroy();
     this.rerender();
     this.ngOnInit();
 }

}
