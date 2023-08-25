import { Component, Inject, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormapiService } from '../service/formapi.service'
import * as alertify from 'alertifyjs';
import {MatSelectModule} from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { DataTableDirective } from 'angular-datatables';
import {Subject} from 'rxjs';
import { Formation } from '../model/formation';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-formation-update',
  templateUrl: './formation-update.component.html',
  styleUrls: ['./formation-update.component.css']
})
export class FormationUpdateComponent implements OnInit {

  constructor(private builder:FormBuilder, private api:FormapiService ,
    private dialog:MatDialog , @Inject(MAT_DIALOG_DATA) public editdata:any,private datePipe: DatePipe) { }
    inputdata:any;
    editedData:any;
    dtTrigger:Subject<any>=new Subject<any>();
    dtElement!: DataTableDirective;
 ngOnInit():void{
  if(this.editdata!='' && this.editdata!=null){
  if(this.editdata.id>0){
  this.setpopupdata(this.editdata.id)
 
 }
 this.getAllformation();
}
 }
 selected!: Date | null;
 dateFormation= new FormControl(new Date(this.editdata.dateFormation))
formationForm=new FormGroup({
  id:this.builder.control({value:'',disabled:true}),
  titre:this.builder.control('',Validators.required),
  description:this.builder.control('',Validators.required),
  dateFormation :new FormControl(new Date(this.editdata.dateFormation)),
  state: this.builder.control(false)
})

 setpopupdata(id:any){
  
  this.api.GetFormationById(this.editdata.id).subscribe(res=>{
    this.editedData=res ;
    this.formationForm.patchValue({ id: this.editedData.id,
      titre: this.editedData.titre, description: this.editedData.description,state:this.editedData.state,dateFormation:this.editdata.dateFormation
    })
  });


}



formation!: Formation[] ;
getAllformation() {
  this.api.GetallFormation().subscribe(data => {
    this.formation = data;
    this.dtTrigger.next(null);
    // this.finaldata.paginator= this._paginator;
    //console.log(this.finaldata);

  });
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

rerender(): void{
  // Destroy the DataTable instance and trigger a new rendering
  if (this.dtElement && this.dtElement.dtInstance) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(null);
    });
  }
}






formatDate(date: Date): string {
  const defaultDate = new Date('1970-01-01');
  return date && date.getTime() !== defaultDate.getTime()
    ? this.datePipe.transform(date, 'MM/dd/yyyy') || ''
    : "Date haven't been set yet";
}

SaveFormation():void{
  if(this.formationForm.valid){
   // const editid=this.formationForm.getRawValue().id;
    if(this.editdata!='' && this.editdata!=null){
      this.api.UpdateFormation(this.formationForm.getRawValue()).subscribe(response =>{
        alertify.set('notifier', 'position', 'top-right');
        alertify.notify('Updated successfully', 'success', 5);
        this.closePopup();
        this.getAllformation();
       
     
    });
  }
}

}
 closePopup(){
   this.dialog.closeAll();
   this.ngOnDestroy();
   this.rerender();
  this.ngOnInit();
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
 


}

