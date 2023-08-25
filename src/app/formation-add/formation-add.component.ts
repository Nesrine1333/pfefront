import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormapiService } from '../service/formapi.service'
import * as alertify from 'alertifyjs';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableDirective } from 'angular-datatables';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formation-add',
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.css']
})
export class FormationAddComponent implements OnInit {

  constructor(private builder:FormBuilder, private api:FormapiService ,
    private dialog:MatDialogRef<FormationAddComponent> , @Inject(MAT_DIALOG_DATA) public editdata:any) { }
    inputdata:any;
    editedData:any;
    dtTrigger:Subject<any>=new Subject<any>();
    dtElement!: DataTableDirective;
 ngOnInit():void {

  this.inputdata= this.editdata
  if(this.inputdata.id>0){
  this.setpopupdata(this.inputdata.id)
 }
 
 }
 currentDate: Date = new Date();

 isDateInFuture(): boolean {
  const dateFormation = this.formationForm.get('dateFormation')?.value;
  if (dateFormation) {
    const currentDate = new Date();
    const selectedDate = new Date(dateFormation);
    return selectedDate.getTime() > currentDate.getTime();
  }
  return false;
}
 
 formationForm=this.builder.group({
   id:this.builder.control({value:'',disabled:true}),
   titre:this.builder.control('',Validators.required),
   description:this.builder.control('',Validators.required),
   dateFormation: this.builder.control('',Validators.required),
   state: this.builder.control(false),
 })

setpopupdata(id:any){
  
    this.api.GetFormationById(this.editdata.id).subscribe(res=>{
      this.editedData=res ;
      this.formationForm.setValue({ id: this.editedData.id,
        titre: this.editedData.titre, description: this.editedData.description,state:this.editedData.state,dateFormation:this.editdata.dateFormation
      })
    });

  
}

 SaveFormation(){
   if(this.formationForm.valid){
    // const editid=this.formationForm.getRawValue().id;
     this.api.GetallFormation().subscribe(res=>{
      const form=res.find((a:any)=>{
        return a.titre == this.formationForm.value.titre
      });
     
     if(form){
      Swal.fire({
          icon: 'warning',
          title: 'La formation existe deja',
          text: 'verifier la list des formations',
      })
     }else{
      const randomId = Math.floor(Math.random() * 1000);
      const formation ={
        id:randomId,
        titre: this.formationForm.value.titre,
        description: this.formationForm.value.description,
        dateFormation: this.formationForm.value.dateFormation,
        state:this.formationForm.value.state

      };
     this.api.createFormation(formation).subscribe(response =>{
      alertify.set('notifier', 'position', 'top-right');
      alertify.notify('Saved successfully', 'success', 5);
       this.closePopup();
     })
    }
    })
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

rerender():void{
  // Destroy the DataTable instance and trigger a new rendering
  if (this.dtElement && this.dtElement.dtInstance) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }
}
 closePopup(){
   this.dialog.close();
   this.ngOnDestroy();
   this.rerender();
   this.ngOnInit();
 }

}


