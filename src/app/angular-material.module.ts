import { NgModule } from '@angular/core';

import {
  MatInputModule, MatCardModule, MatButtonModule,
  MatToolbarModule, MatExpansionModule,
  MatProgressSpinnerModule, MatPaginatorModule,
  MatSidenavModule, MatIconModule, MatListModule,
  MatSelectModule, MatDialogModule, MatMenuModule
} from '@angular/material';


@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class AngularMaterialModule {

}
