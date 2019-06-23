/*
  On réalise ici toutes les importations des Modules (ex : BrowserModule)
  ou des Classes (ex : ProductCreateComponent)
  qui seront utilisés dans notre application
*/

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
/*
  on veut avoir notre propre validateur, il faut donc aller
  vers une approche réactive des formulaires.
  On utilise donc ReactiveFormsModule
  l'approche réactive nous permet de tout définir clairement
  dans notre code TS puis d'interroger Angular pour qu'il voit quels inputs
  correspondent à ce que l'on a défini.

*/

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularMaterialModule } from './angular-material.module';
import { ProductsModule } from './products/products.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthInterceptor } from './authentication/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
// Les Classes importées sont ensuite placées dans la partie 'declarations' du décorateur @NgModule
// les Modules sont placés dans la partie 'imports'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ProductsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})

// On exporte ce fichier via l'instruction ci-dessous, et auquel on attribue un nom de classe

export class AppModule { }
