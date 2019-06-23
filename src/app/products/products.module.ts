import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './products-list/product-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
declarations: [
  ProductCreateComponent,
  ProductListComponent
],
imports: [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  AngularMaterialModule,
  RouterModule
]

})
export class ProductsModule {}
