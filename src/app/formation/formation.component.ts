
  import { Component, OnInit, ViewChild } from '@angular/core';
  import { ElementRef } from '@angular/core';
  import { FormapiService } from '../service/formapi.service'
  import { Formation } from '../model/formation';
  import { MatDialog } from "@angular/material/dialog";
 import { FormationAddComponent} from '../formation-add/formation-add.component'
  import { MatTableDataSource } from "@angular/material/table";
  import * as alertify from 'alertifyjs';
  import { MatPaginator } from '@angular/material/paginator';
  import {Subject} from 'rxjs';
  import Swal from 'sweetalert2';
  import { DataTableDirective } from 'angular-datatables';
import {  PersonnelsuiviComponent } from '../personnelsuuivi/personnelsuivi.component';
import { FormationUpdateComponent } from '../formation-update/formation-update.component';
import { DatePipe } from '@angular/common';
import { SuiviService } from '../service/suivi.service';
import { Suivi } from '../model/suivi';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  
    constructor(private elementRef: ElementRef, private service: FormapiService
      , private dialog: MatDialog,private datePipe: DatePipe,private suiviservice:SuiviService ) { }
  
   @ViewChild(MatPaginator) paginator!: MatPaginator;
   //@ViewChild(DataTableDirective, { static: false })
    formation!: Formation[] ;
    finaldata:any;
  dtOptions:DataTables.Settings={};
  dtTrigger:Subject<any>=new Subject<any>();
  dtElement!: DataTableDirective;
   displayColums : string[]=["id" , "titre","description","state"]
  
   Formation!:Formation[] ;
   selectedFormation!:Formation[] ;


/*   formatDate(date: number | null): string {
    if (date) {
      return this.datePipe.transform(new Date(date), 'dd/MM/yyyy') || '';
    }
    return '';
  }*/


    getAllformation() {
      this.service.GetallFormation().subscribe(data => {
        this.formation = data.map((item: any) => {
          return {
            id: item.id,
            titre: item.titre,
            description: item.description,
            state: item.state,
            dateFormation: new Date(item.dateFormation), // Convert Unix timestamp to Date object
            suiviValue: item.suiviValue
          };
        });
         this.dtTrigger.next(null);
         this.rerender();
        // this.finaldata.paginator= this._paginator;
        //console.log(this.finaldata);
  
      });
    }
  
    formatDate(date: Date): string {
      const defaultDate = new Date('1970-01-01');
      return date && date.getTime() !== defaultDate.getTime()
        ? this.datePipe.transform(date, 'MM/dd/yyyy') || ''
        : "Date haven't been set yet";
    }
    Editformation(id: any) {
      this.OpenPopupUpdate(id);
      console.log("Edit button clicked. ID: " + id);
    }
  
   
  
    ngOnInit(){
  

      this.dtOptions={
        pagingType:'simple_numbers'
      };
      this.getAllformation();
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
  rerender(): void {
    // Destroy the DataTable instance and trigger a new rendering
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    }
  }

  Removeformation(id: any) {
    alertify.confirm("Remove formation", "are you sure ?", () => {
      this.service.deleteFormation(id).subscribe(r => {
        this.ngOnDestroy();
     this.rerender();
     this.ngOnInit();
      });
       }, function () { })
}
  
    OpenPopup(item: any) {
      const _popup = this.dialog.open(FormationAddComponent, {
        width: '600px',
        height: '500px',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '200ms',
        data: {
          id: item.id,
          dateFormation:this.formatDate(item.dateFormation)
        }
  
      })
      _popup.afterClosed().subscribe(res => {
        this.getAllformation() ;
        this.ngOnDestroy();
        this.rerender();
        this.ngOnInit;
      });
    }

    OpenPopupUpdate(id: any) {
      const _popup = this.dialog.open(FormationUpdateComponent, {
        width: '600px',
        height: '500px',
        enterAnimationDuration: '100ms',
        exitAnimationDuration: '200ms',
        data: {
          id: id
        }
  
      })
      _popup.afterClosed().subscribe(res => {
        this.getAllformation() ;
        this.ngOnDestroy();
        this.rerender();
        this.ngOnInit;
      });
    }
  
  //  checked :boolean= false;
   // checkedup(id:any){
    //  if(!this.checked){
   //   this.checked=true ;
  //  }
//  }

 // Uncheckedup(id:any) {
  //  this.doneChecked = false;
 //   this.notDoneChecked=false
// }



  //toggleDone(id:any) {
  //  this.doneChecked = !this.doneChecked;
  //  this.notDoneChecked = !this.doneChecked;
//  }

//  toggleNotDone(id:any) {
  //  this.notDoneChecked = !this.notDoneChecked;
 //   this.doneChecked = !this.notDoneChecked;
//  }
  
//}

doneChecked= true;
notDoneChecked = true;



toggleDone(item: any) {
  item.checked = true;
  item.doneChecked = !item.doneChecked;
  item.notDoneChecked = !item.doneChecked;
  if (!item.doneChecked) {
    item.doneChecked = true;
    item.notDoneChecked = false;
  } else {
    item.doneChecked = false;
    item.notDoneChecked = true;
  }

}

toggleNotDone(item: any) {
  item.checked = false;
  item.notDoneChecked = !item.notDoneChecked;
  item.doneChecked = !item.notDoneChecked;
}
  
PersonnelOpen(form:Formation){
//
this.suiviservice.GetallSuivi().subscribe(data=>{

  const suivi=data.find((item:Suivi)=>{
    return item.formation_id == form.id ;
  });
if(suivi){
  this.OpenPopupPersonnel(form);

}else{

  Swal.fire({
    icon: 'warning',
    title: 'List des Personnel qui ont été valide pour cette compétence est vide !!',
  })

}
},
(error: any) => {
  console.error('An error occurred while fetching the data:', error);
}
);
}
OpenPopupPersonnel(item: Formation){

  this.dialog.open(PersonnelsuiviComponent,{
    width: '600px',
    height: '500px',
    enterAnimationDuration: '100ms',
    exitAnimationDuration: '200ms',
    data: {
      id : item.id,
      titre :item.titre,
      state:item.state,
      idsuivi :item.suiviValue      }

  })
}


}
