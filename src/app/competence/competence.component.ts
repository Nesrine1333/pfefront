import { Component, OnInit,OnDestroy, ViewChild,AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { RestapiService } from '../service/compapi.service'
import { Comeptence } from '../model/comeptence';
import { MatDialog } from "@angular/material/dialog";
import { CompetenceAddComponent } from '../competence-add/competence-add.component';
import { MatTableDataSource } from "@angular/material/table";
import * as alertify from 'alertifyjs';
import { MatPaginator } from '@angular/material/paginator';
import {Observable, Subject, map} from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { NgxSelectDropdownComponent } from 'ngx-select-dropdown';
import {NgSelectOption} from '@angular/forms';
import { CategapiService } from '../service/catapi.service'
import { Categorie } from '../model/categorie';
import {FormControl} from '@angular/forms';
import { PersonnelComponent } from '../personnel/personnel.component';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { MatSort } from '@angular/material/sort';
import { NiveauService } from '../service/niveau.service';
import { Niveau } from '../model/niveau';
import { CompetenceupdateComponent } from '../competenceupdate/competenceupdate.component';
import { PersonnelAllComponent } from '../personnel-all/personnel-all.component';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent implements OnInit  {

  constructor(private elementRef: ElementRef, private service: RestapiService
    , private dialog: MatDialog,private catapi:CategapiService,private router: Router, private nivservice:NiveauService) { }

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!: MatSort;
//@ViewChild(DataTableDirective, { static:true ,read: DataTableDirective  })

  competence!: Comeptence[] ;
  finaldata:any;

dtOptions:DataTables.Settings={};
dtTrigger:Subject<any>=new Subject<any>();
dtElement!: DataTableDirective;
categorie! :Categorie[];
categorieSelect!:Categorie[] ;

 displayColums : string[]=["No" , "designation","categorie","id_personnel"]

 selectedcompetence!:any;
selectedcategorie!: string ;
isSelected!:  boolean;
compfilter!: Observable<Comeptence[]>;
filteredCompetences: any = [{}];



 //getCompetenceByCategorie(e:any){
  //this.selectedValue=e.target.value ;
 // this.filterCompetencesByCategory(this.selectedValue);
 //}

 categorieComp :{ [key: string]: Observable<string> } = {};
 public getCategForCompetence(id:any){
  if(!this.categorieComp[id])
  this.categorieComp[id]=this.service.GetCategorieForCompetence(id).pipe(
    map(data=>data.lib_categorie)
  )
  return this.categorieComp[id] ;
 }

 id!:any ;
 filterCompetencesByCategory(selectedcategorie:string) {
  
  if (!selectedcategorie) {
    // If selectedcategorie is empty or falsy, return all competences
    this.finaldata.data = this.competence.map((item: Comeptence, index: number) => ({ ...item, index: index + 1 }));
    this.finaldata.paginator = this.paginator;
    this.finaldata.sort = this.sort;  
    return;
  }

  this.service.getCompetenceOfSelectedCategorie(selectedcategorie).subscribe(
    data => {
      const categoryId = parseInt(selectedcategorie, 10); // Convert the selected category ID to a number
  let index = 1; // Initialize the index counter
  this.finaldata.data = this.competence.filter((comp: Comeptence) => comp.categorieId === categoryId).map((item: Comeptence) => ({ ...item, index: index++ }));

  this.finaldata.paginator = this.paginator;
  this.finaldata.sort = this.sort;
     
    },
    error => {
      // Handle any errors that occur during the API request
      console.error('An error occurred:', error);
    }
  );

     
   }


   // return this.compfilter= this.competence.filter(comp => comp.designation.indexOf(mot)!=-1);
 // this.service.getCompetenceOfSelectedCategorie(selectedcategorie).subscribe(
   //data=>{
     //this.competence =data;
   //})
  //  if (selectedcategorie) {
      // Perform filtering based on the selected category
  //    this.competence = this.competence.filter(item => item.categorieId ===selectedcategorie.id_categorie);
  //  } 
  searchfilter(event: Event){
    const filvalue = (event.target as HTMLInputElement).value;
    this.finaldata.filter=filvalue ;
  }

 getAllcategorie() {
  this.catapi.GetallCategorie().subscribe(data => {
    this.categorieSelect =data;
    // this.finaldata.paginator= this._paginator;
    //console.log(this.finaldata);

  });
}

  

displayColumns:string[]=["no","designation","categorieId","action"]
  EditCompetence(id: any) {
    this.OpenPopupUpdate(id);
    console.log("Edit button clicked. ID: " + id);
  };

  ngOnInit(){
    this.dtOptions={
      pagingType:'simple_numbers'
    };
    this.getAllCompetence();
    this.getAllcategorie();
      this.getCategForCompetence;
    //this.getCategoriById;
  
    this.fetchData();
  }

compete !:Comeptence[]
  searchvalue=''

  fetchData(): void{
    this.service.getCompParCat(this.searchvalue).subscribe((compete)=>{
      this.compete = compete;
    })
  }

  ngAfterViewInit() {
    this.getAllCompetence();
  }
  i!:any;
  
  getAllCompetence() {
    this.service.GetallCompetences().subscribe(data => {
      this.competence = data.map((item: Comeptence, index: number) => ({ ...item, index: index + 1 }));
      this.finaldata=new MatTableDataSource<Comeptence>(this.competence);
      this.finaldata.paginator=this.paginator;
      this.finaldata.sort=this.sort;
     
   //   this.dtTrigger.next(null);
      // this.finaldata.paginator= this._paginator;
      //console.log(this.finaldata);

    });
  }
 // categori:Categorie ;
 
  getCategoriById(id:any){
    this.catapi.GetCategorieById(id).subscribe(data=>{
      return data[id].lib_categorie ;
    })
  }
  
 getCategBylib(id:any){
  this.catapi.GetCategorieByDesign(id).subscribe(
  label=>{
    return label ;
  }
 )
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
 
  RemoveCompetence(id: any) {
    alertify.confirm("Remove competence", "are you sure ?", () => {
      this.service.deleteCompetence(id).subscribe(r => {
       this.ngOnDestroy();
       this.rerender();
       this.ngOnInit();
      });
       }, function () { })
}

PersonnelOpen(comp:Comeptence){
  this.nivservice.Getallniveau().subscribe(data=>{
    
      const niveau = data.find((item: Niveau) => {
        return item.competence_id == comp.id;
      });
      console.log(niveau);
      
      if (niveau) {
        this.OpenPopupPersonnel(comp);
      } else {
     /*   alertify.alert("There's no one for now",function(){
            
        }).set('modal', true).set('closable', false).setHeader('');

        var alertElement = document.getElementsByClassName('ajs-modal')[0] as HTMLElement;;
          var okButtonElement = document.getElementsByClassName('ajs-button ajs-ok')[0] as HTMLElement;;
          var alertContainerElement = document.getElementsByClassName('ajs-modal')[0].parentElement as HTMLElement;

         // alertElement.style.backgroundColor = '#e4dcef';  // Change the background color of the alert
          okButtonElement.style.backgroundColor = 'rgb(22, 100, 92)';  // Change the background color of the OK button
          okButtonElement.style.color = 'white';  // Change the text color of the OK button
          okButtonElement.style.border = '2px solid #551227';
          okButtonElement.style.borderRadius = '5px';

          alertContainerElement.style.display = 'flex';
          alertContainerElement.style.justifyContent = 'center';
          alertContainerElement.style.alignItems = 'center';
         // alertContainerElement.style.backgroundColor ='#d3bfc6';

          var messageElement = document.getElementsByClassName('ajs-content')[0] as HTMLElement;
          messageElement.style.color = 'rgb(22, 100, 92)';
          messageElement.style.fontFamily = 'Arial';
          messageElement.style.fontSize = '20px';
          messageElement.style.display = 'flex';
          messageElement.style.alignItems='center';
          messageElement.style.justifyContent = 'center';
       
          var boxContainerElement = document.getElementsByClassName('ajs-modal')[0] as HTMLElement;
          boxContainerElement.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.5)';
          var headerElement = document.getElementsByClassName('ajs-header')[0] as HTMLElement;
          headerElement.style.fontSize = '24px';
          headerElement.style.fontWeight = 'bold';*/
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

OpenPopupPersonnel(item :Comeptence){
 //const designation = item.designation;
    this.dialog.open(PersonnelComponent, {
     
       width: '600px',
    height: '500px',
    enterAnimationDuration: '100ms',
    exitAnimationDuration: '200ms',
    data: {
      id : item.id,
      designation :item.designation,
      idniv :item.niveau
      }
   
      

    })
  
    console.log(item.niveau);
  }

  OpenPopup(id: any) {
    const _popup = this.dialog.open(CompetenceAddComponent, {
      width: '600px',
      height: '500px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '200ms',
      data: {
        id: id
      }

    })
    _popup.afterClosed().subscribe(res => {
      this.ngOnDestroy();
      this.rerender();
      this.ngOnInit();
    });
  }

  OpenPopupUpdate(id: any) {
    const _popup = this.dialog.open(CompetenceupdateComponent, {
      width: '600px',
      height: '500px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '200ms',
      data: {
        id: id
      }

    })
    _popup.afterClosed().subscribe(res => {
      this.ngOnDestroy();
      this.rerender();
      this.ngOnInit();
    });
  }


  OpenPopupPersonnelAll(id:any){
    this.dialog.open(PersonnelAllComponent, {
      width: '600px',
      height: '500px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '200ms',
      data: {
        id: id
      }})
  }

  

}


