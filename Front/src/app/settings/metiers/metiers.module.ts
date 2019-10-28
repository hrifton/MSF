import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MetiersRoutingModule } from './metiers-routing.module';

import { MetiersComponent } from './metiers.component';
import { ListMetiersComponent } from './list-metiers/list-metiers.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { FormulaireMetierComponent } from './formulaire-metier/formulaire-metier.component';
import { FormulaireCategorieComponent } from './formulaire-categorie/formulaire-categorie.component';


@NgModule({
  declarations: [
    MetiersComponent,
    ListMetiersComponent,
    ListCategorieComponent,
    FormulaireMetierComponent,
    FormulaireCategorieComponent
  ],
  imports: [
    CommonModule,
    MetiersRoutingModule,
    GridAllModule,
    ReactiveFormsModule
  ],
  exports: [MetiersComponent] 
})
export class MetiersModule {}
