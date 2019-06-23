import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/authentication.service';


@Component({
  // La ligne ci-dessous permet de désactiver la règle définissant
  // la longueur maximale de la ligne suivante dans les fichiers .ts
  // tslint:disable-next-line:max-line-length
  selector: 'app-root',
  // lorsque l'on voudra utiliser le composant app dans notre page,
  // nous utiliserons les balises qui lui correspondent, ici ce sera <app-root></app-root> (cf. index.html)
  templateUrl: './app.component.html',
  // on définit ici quel fichier .html sera utilisé pour ce fichier
  styleUrls: ['./app.component.css']
  // ici, c'est le fichier .css qui sera utilisé pour stylisé le fichier .html précédent
})
export class AppComponent implements OnInit {
  title = 'PTUTMEAN';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
