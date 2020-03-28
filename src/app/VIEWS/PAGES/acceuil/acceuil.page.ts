import { Component, OnInit } from '@angular/core';
import { LIST_MENU_HOME } from 'src/app/TOOLS/INITIALISATION/initVar';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.page.html',
  styleUrls: ['./acceuil.page.scss'],
})
export class AcceuilPage implements OnInit {

  listMenuHome: any = [];

  constructor() { }

  ngOnInit() {
    this.initClassVar();
  }

  initClassVar() {
      this.listMenuHome = LIST_MENU_HOME;
  }

}
