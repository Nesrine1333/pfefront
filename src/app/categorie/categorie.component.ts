import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { CategapiService } from '../service/catapi.service'
import { Categorie } from '../model/categorie';
import { MatDialog } from "@angular/material/dialog";
import { CategorieformComponent } from '../categorieform/categorieform.component';
import { MatTableDataSource } from "@angular/material/table";
import * as alertify from 'alertifyjs';
import { MatPaginator } from '@angular/material/paginator';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit{

  constructor(private elementRef: ElementRef, private service: CategapiService
    , private dialog: MatDialog) { }

 @ViewChild(MatPaginator) paginator!: MatPaginator;
 //@ViewChild(DataTableDirective, { static: false })
  categorie!: Categorie[] ;
  finaldata:any;
dtOptions:DataTables.Settings={};
dtTrigger:Subject<any>=new Subject<any>();
dtElement!: DataTableDirective;
 displayColums : string[]=["id" ,"designation" , "desComp"]


  getAllcategorie() {
    this.service.GetallCategorie().subscribe(data => {
      this.categorie = data;
      this.dtTrigger.next(null);
      // this.finaldata.paginator= this._paginator;
      //console.log(this.finaldata);

    });
  }

  Editcategorie(id: any) {
    this.OpenPopup(id);
    console.log("Edit button clicked. ID: " + id);
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
 
  Removecategorie(id: any) {
    alertify.confirm("Remove categorie", "are you sure ?", () => {
      this.service.deleteCategorie(id).subscribe(r => {
        this.getAllcategorie();
      });
    }, function () { })
}

  ngOnInit(): void{

    this.dtOptions={
      pagingType:'simple_numbers'
    };
    this.getAllcategorie();
  }

  OpenPopup(id: any) {
    const _popup = this.dialog.open(CategorieformComponent, {
      width: '600px',
      height: '500px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '200ms',
      data: {
        id: id
      }

    })

    _popup.afterClosed().subscribe(res => {
      this.getAllcategorie();
    });
  }

  showCompetence: boolean[] = [];
  toggleCompetence(index: number): void {
    this.showCompetence[index] = !this.showCompetence[index];
  }

}


