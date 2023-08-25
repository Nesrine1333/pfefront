import { NgModule } from "@angular/core";
import{ MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule }  from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import{MatDialogModule} from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import{ MatTableModule ,MatTableDataSource} from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import {MatSelectModule} from '@angular/material/select';
import {NgSelectOption} from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatSortModule } from "@angular/material/sort";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({

    exports:[
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSelectModule,
        MatButtonModule,
        MatSortModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,

    ]
})


export class MaterialModule{

}