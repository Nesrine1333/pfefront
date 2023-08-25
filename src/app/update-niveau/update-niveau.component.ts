import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CategapiService } from '../service/catapi.service';
import { RestapiService } from '../service/compapi.service';
import { NiveauService } from '../service/niveau.service';
import * as alertify from 'alertifyjs';
import { Observable, map } from 'rxjs';
import { PersonnelService } from '../service/personnel.service';
import { Personnel } from '../model/personnel';
import { Comeptence } from '../model/comeptence';

@Component({
  selector: 'app-update-niveau',
  templateUrl: './update-niveau.component.html',
  styleUrls: ['./update-niveau.component.css']
})
export class UpdateNiveauComponent implements OnInit {

  constructor(private builder:FormBuilder, private api:NiveauService ,private catapi:CategapiService,
    private dialog:MatDialogRef<UpdateNiveauComponent> , @Inject(MAT_DIALOG_DATA) public data:any,private perservice:PersonnelService,private service: RestapiService) { }

  ListNiveau =['E','O','F','N']

  editData:any;
  ngOnInit(): void {
    if(this.data!='' && this.data!=null){
      this.api.GetniveauById(this.data.id).subscribe(res=>{
        this.editData=res;
        this.Niveauform.setValue({id: this.editData.id ,libelle: this.editData.libelle,
          competence_id:this.editData.competence_id ,personnel_id:this.editData.personnel_id })
      })
    }
  }

  personnelNames: { [key: string]: Observable<string> } = {};
public getPersonnelName(id: any): Observable<string> {
  if (!this.personnelNames[id]) {
    this.personnelNames[id] = this.perservice.GetpersonnelById(id).pipe(
      map(data => data.nom)
    );
  }
  return this.personnelNames[id];
}

personnel!:Personnel;
getPersonnelById(id: any) {
  this.perservice.GetpersonnelById(id).subscribe(
    (resp: Personnel) => {
      // Handle success response
      console.log('Personnel retrieved:', resp);
      this.personnel = resp;
      if (this.personnel) {
        this.Niveauform.patchValue({
          personnel_id: this.personnel.nom
        });
      }
     
    },
    (error) => {
      // Handle error response
      console.error('Error retrieving personnel:', error);
    }
  );
}

  competenceName: { [key: string]: Observable<string> } = {};
  public getCompetenceDesign(id:any): Observable<string>{
    if(!this.competenceName[id]){
      this.competenceName[id]= this.service.GetCompetenceById(id).pipe(
        map(data => data.designation)
      )
    }
    return  this.competenceName[id]
  }

competence!:Comeptence 
  getCompetenceId(id: any) {
    this.service.GetCompetenceById(id).subscribe(
      (resp: Comeptence) => {
        // Handle success response
        console.log('Personnel retrieved:', resp);
        this.competence = resp;
        if (this.competence) {
          this.Niveauform.patchValue({
            competence_id: this.competence.designation
          });
        }
       
      },
      (error) => {
        // Handle error response
        console.error('Error retrieving personnel:', error);
      }
    );
  }

  editedData:any;

  

  Save(){
    if(this.Niveauform.valid){
      const editid=this.Niveauform.getRawValue().id;
     if(this.editedData!='' && editid!=null){
      this.api.Updateniveau(this.Niveauform.value).subscribe(response=>{
        alertify.set('notifier', 'position', 'top-right');
        alertify.notify('Updated successfully', 'success', 5);
        this.closePopup();
      })
    }
  }
  }
  personnelNameControl = new FormControl();

  Savee() {
    if (this.Niveauform.valid) {
      const personnelId = this.Niveauform.value.personnel_id;
      const personnelName = this.personnelNameControl.value;
  
      const formData = {
        id: this.Niveauform.getRawValue().id,
        libelle: this.Niveauform.value.libelle,
        competence_id: this.Niveauform.getRawValue().competence_id,
        personnel_id: personnelId,
        personnel_name: personnelName  // Include personnel name in form data
      };
  
      if (this.editedData !== '' && formData.id != null) {
        this.api.Updateniveau(formData).subscribe(response => {
          alertify.set('notifier', 'position', 'top-right');
          alertify.notify('Updated successfully', 'success', 5);
          this.closePopup();
        });
      }
    }
  }
  
  Niveauform=new FormGroup({
    id:new FormControl({value:'',disabled:true}),
    libelle:new FormControl('',Validators.required),
    competence_id:new FormControl('',Validators.required),
    personnel_id:new FormControl('',Validators.required)
  })


  closePopup(){
    this.dialog.close();
      this.ngOnInit();
  }
 


}
