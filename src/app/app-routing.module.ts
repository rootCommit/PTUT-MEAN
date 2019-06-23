import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './products/products-list/product-list.component';
import { ProductCreateComponent } from './products/product-create/product-create.component';
import { AuthGuard } from './authentication/auth.guard';

/* On définit une liste de routes car on veut pouvoir avoir plusieurs
pages, donc plusieurs routes */


const routes: Routes = [
  // Si path est vide, cela indique la page principale => localhost:4200
  { path: '', component: ProductListComponent },
  // ici path contient une valeur, cela indique la page localhost:4200/create
  { path: 'create', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:productId', component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: './authentication/auth.module#AuthModule'}
];

 @NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
   providers: [AuthGuard]
 })
export class AppRoutingModule {}
