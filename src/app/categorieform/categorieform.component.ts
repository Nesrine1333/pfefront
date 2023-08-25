import { Categorie } from '../model/categorie';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CategapiService } from '../service/catapi.service'
import * as alertify from 'alertifyjs';
import {MatSelectModule} from '@angular/material/select';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-categorieform',
  templateUrl: './categorieform.component.html',
  styleUrls: ['./categorieform.component.css']
})
export class CategorieformComponent implements OnInit,OnDestroy {

  constructor(private builder:FormBuilder, private api:CategapiService ,
    private dialog:MatDialog , @Inject(MAT_DIALOG_DATA) public data:any) { }
 
    categorie!: Categorie[];
    editedData:any;
    getAllcategorie() {
      this.api.GetallCategorie().subscribe(data => {
        this.categorie = data;
        // this.finaldata.paginator= this._paginator;
        //console.log(this.finaldata);
  
      });
    }
    dtTrigger:Subject<any>=new Subject<any>();
    dtElement!: DataTableDirective;
  
    ngOnDestroy(): void {
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
 ngOnInit() {

  
   if(this.data!='' && this.data!=null){
     this.api.GetCategorieById(this.data.id).subscribe(res=>{
       this.editedData=res ;
       this.categorieform.patchValue({ id_categorie: this.editedData.id_categorie,
         lib_categorie: this.editedData.lib_categorie, competence: this.editedData.competence
       })
     });

   }
 }

 categorieform=this.builder.group({
  id_categorie:this.builder.control({value:'',disabled:true}),
  lib_categorie:this.builder.control('',Validators.required),
  competence:this.builder.control('',Validators.required),
   
 })


 SaveCategorie(){
   if(this.categorieform.valid){
     const editid=this.categorieform.getRawValue().id_categorie;
     if(this.editedData!='' && editid!=null){
       this.api.UpdateCategorie(this.categorieform.value).subscribe(response =>{
         alertify.success("updated sucessfully")
          this.closePopup();
     });
   }else{
     this.api.createCategorie(this.categorieform.value).subscribe(response =>{
      alertify.success("saved sucessfully")
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
