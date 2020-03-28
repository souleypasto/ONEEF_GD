import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
 

  //
  // Les variables 
  //
  @Input() template: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() urlPage: string;
  @Input() description: string;
  @Input() icon: string;

  constructor() {
    this.initClassVar();
   }

  ngOnInit() {}

  /**
   * declaration// initialisation des variables de classe
   */
  initClassVar(): void {
    if (!this.template) {
      this.template = 'DEFAULT';
    }
    if (!this.subtitle) {
      this.subtitle = 'le sous titre du Menu';
    }
    if (!this.description) {
      this.description = 'la description du truc si ici ';
    }
  }

}
