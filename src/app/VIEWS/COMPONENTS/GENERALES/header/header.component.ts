import { Component, OnInit, Input } from '@angular/core';
import { Utilisateur } from 'src/app/MODELS/Utilisateur';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  //
  // Les variables reçu
  //
  @Input() titre: string;
  @Input() soustitre: string;
  @Input() defaultParenUrl: string;
  @Input() menuButton: boolean;

  utilisateur: Utilisateur;

  constructor() {
    this.initClassVar();
   }

  ngOnInit() {}

  initClassVar() {
    console.log('initialisation des varaibles de la classe');
    this.utilisateur = {
      nom: 'Sillery TALLA',
      login: 'souley',
      password: 'bébé'
    };
    if (this.defaultParenUrl === '' || !this.defaultParenUrl) {
      this.defaultParenUrl = 'tabs';
    }
  }

}
