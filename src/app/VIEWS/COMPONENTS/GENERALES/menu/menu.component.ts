import { Component, OnInit, Input } from '@angular/core';
import { CommunFunction } from '../../../../TOOLS/FUNCTIONS/communFunctions';

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
  @Input() menu: any;

  constructor(private util: CommunFunction) {
    
   }

  ngOnInit() {
    this.initClassVar();
  }

  /**
   * declaration// initialisation des variables de classe
   */
  initClassVar(): void {
    if (this.menu) {
      if (!this.template) {
        this.template = 'DEFAULT';
      }
      if (!this.menu.subtitle) {
        this.menu = 'le sous titre du Menu';
      }
      if (!this.menu.subtitle) {
        this.menu.subtitle = 'la description du truc si ici ';
      }
    }
  }

  /**
   * Naviguer vers le menu sur lequel on a cliquer 
   */
  goToMenuPage() {
    if (this.menu.urlPage === 'default') {
      this.util.showNotImplementedBox();
    } else {
      this.util.redirectWithRouteQuery(this.menu.urlPage);
    }
  }

}
